from flask import Flask, request, send_file
from flask_cors import CORS
import psycopg2 as psg

conn = psg.connect(database="delivery_base", user='postgres', password='1234')
cursor = conn.cursor()

app = Flask(__name__)
CORS(app)

@app.route('/members')
def members():
    return {"Members": ["Member1", "Member2", "Member3"]}

@app.route('/api/register', methods=['POST'])
def register():
    req = request.get_json()
    cursor.execute("SELECT * FROM users WHERE email = %s", ( req['email'], ))
    conn.commit()
    resp_user = cursor.fetchone()
    if resp_user is None:
        cursor.execute("INSERT INTO users (name, surname, email, password, number) VALUES (%s, %s, %s, %s, %s)",
                       (req['name'], req['surname'], req['email'], req['password'], req['tel']))
        conn.commit()
        return {"Message": "Success"}
    
    return {"Message": "User already exists"}

@app.route('/api/login', methods=['POST'])
def login():
    req = request.get_json()
    cursor.execute("SELECT * FROM users WHERE email = %s", ( req['email'], ))
    conn.commit()
    resp_user = cursor.fetchone()
    if resp_user is None:
        return {"Message": "User not found"}
    return {
        "Message": "Success",
        "id": resp_user[0],
        "name": resp_user[1],
        "surname": resp_user[2],
        "email": resp_user[3],
        "tel": resp_user[5]
    }

@app.route('/api/delete_user', methods=['POST'])
def delete_user():
    email = request.get_json()['email']
    cursor.execute("DELETE FROM users WHERE email = %s", (email,))
    conn.commit()
    return "Done!"

@app.route('/api/products')
def products():
    cursor.execute("SELECT * FROM products")
    conn.commit()
    data = []
    try:
        all_products = cursor.fetchall()
    except:
        return ''
    for i in all_products:
        card = dict()
        card["id"] = i[0]
        card["title"] = i[1]
        card["price"] = i[2]
        card["image"] = i[3]
        card["description"] = i[4]
        data.append(card)
    return data

@app.route('/api/cart/get_products', methods=['POST'])
def get_cart_products():
    email = request.get_json()['email']
    cursor.execute("SELECT (cart) FROM users WHERE email = %s", (email,))
    conn.commit()
    list_products = []
    try:
        cart_list = cursor.fetchone()
    except:
        return ''
    if cart_list is None or cart_list[0] is None:
        return {'success': False, 'message': "Ваша корзина пуста"}
    cart_list = cart_list[0]
    try:
        cart_list = tuple(str(cart_list).split(','))
    except:
        print(cart_list)
    cursor.execute("SELECT * FROM products WHERE id in %s", (cart_list, ))
    conn.commit()
    for i in cursor.fetchall():
        try:
            card = dict()
            card["id"] = i[0]
            card["title"] = i[1]
            card["price"] = i[2]
            card["image"] = i[3]
            card["description"] = i[4]
            list_products.append(card)
        except:
            print(i)
    return {'success': True, 'products': list_products}


@app.route('/api/img/<image>')
def get_image(image):
    return send_file('images/' + image)

@app.route('/api/delete/product/<idi>')
def delete_product(idi):
    cursor.execute("delete from products where id = %s", ( idi, ))
    conn.commit()
    return "success"

@app.route('/api/cart/add/<id_product>', methods=['POST'])
def add_in_cart(id_product):
    email_user = request.get_json()['email']
    cursor.execute("SELECT (cart) FROM users WHERE email = %s", ( email_user, ))
    conn.commit()
    resp = cursor.fetchone()[0]
    if resp is None:
        cursor.execute("UPDATE users SET cart=%s WHERE email = %s", ( id_product, email_user, ))
        conn.commit()
        return "success"
    fav: list = resp.split(',')
    for i in fav:
        if i == id_product:
            return "У вас уже есть этот товар в корзине"
    fav.append(id_product)
    fav = ','.join(fav)
    cursor.execute("UPDATE users SET cart=%s WHERE email = %s", (fav, email_user, ))
    conn.commit()
    return "success"

@app.route('/api/cart/remove/<id_product>', methods=['POST'])
def remove_from_cart(id_product):
        email_user = request.get_json()['email']
        cursor.execute("SELECT (cart) FROM users WHERE email=%s", (email_user,))
        conn.commit()
        cart_products = cursor.fetchone()
        if cart_products is None: return ''
        cart = ','.join(list(filter(lambda x: x != id_product, cart_products[0].split(','))))
        cart = None if not cart else cart
        cursor.execute("UPDATE users SET cart=%s WHERE email=%s", (cart, email_user,))
        conn.commit()
        return "Done"


if __name__ == '__main__':
    app.run(debug=True)
    cursor.close()
    conn.close()

# /var/lib/pgsql/data/pg_hba.conf --> (peer -> md5)