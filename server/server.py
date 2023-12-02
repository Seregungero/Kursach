from flask import Flask, request, send_file
import psycopg2 as psg

conn = psg.connect(database="delivery_base", user='postgres', password='1234')
cursor = conn.cursor()

app = Flask(__name__)

@app.route('/members')
def members():
    return {"Members": ["Member1", "Member2", "Member3"]}

@app.route('/register', methods=['POST'])
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

@app.route('/login', methods=['POST'])
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

@app.route('/delete_user', methods=['POST'])
def delete_user():
    email = request.get_json()['email']
    cursor.execute("DELETE FROM users WHERE email = %s", (email,))
    conn.commit()
    return "Done!"

@app.route('/products')
def products():
    cursor.execute("SELECT * FROM products")
    conn.commit()
    data = []
    for i in cursor.fetchall():
        card = dict()
        card["id"] = i[0]
        card["title"] = i[1]
        card["price"] = i[2]
        card["image"] = i[3]
        card["description"] = i[4]
        data.append(card)
    return data

@app.route('/img/<image>')
def get_image(image):
    return send_file('images/' + image)

@app.route('/delete/product/<idi>', methods=['POST'])
def delete_product(idi):
    cursor.execute("delete from products where id = %s", ( idi, ))
    conn.commit()
    return "success"

@app.route('/cart/add/<id_product>', methods=['POST'])
def add_in_cart(id_product):
    print(id_product)
    cursor.execute("SELECT (cart) FROM users WHERE email = %s", ( request.get_json()['email'], ))
    conn.commit()
    resp = cursor.fetchone()[0]
    if resp is None:
        cursor.execute("INSERT INTO users (cart) VALUES (%s)", ( id_product ,))
        conn.commit()
        return "success"
    fav: list = resp.split(',')
    for i in fav:
        if i == id_product:
            return "У вас уже есть этот товар в корзине"
    fav.append(id_product)
    fav = ','.join(fav)
    cursor.execute("INSERT INTO users (cart) VALUES (%s)", ( fav,))
    conn.commit()
    return "success"


if __name__ == '__main__':
    app.run(debug=True)
    cursor.close()
    conn.close()

# /var/lib/pgsql/data/pg_hba.conf --> (peer -> md5)