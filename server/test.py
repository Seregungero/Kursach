import psycopg2 as psg

conn = psg.connect(database="delivery_base", user='postgres', password='1234')
cursor = conn.cursor()
cursor.execute("SELECT * FROM users WHERE email = %s", ('legeorg2004@gmail.com',))
conn.commit()
print(cursor.fetchone())