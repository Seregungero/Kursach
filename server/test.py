import psycopg2 as psg
# import asyncio, aiopg

conn = psg.connect(database="delivery_base", user='postgres', password='1234')
cursor = conn.cursor()
email_user = 'legeorg2004@gmail.com'
test_data = str(("6", "7"))
# cursor.execute("SELECT * FROM users WHERE email = %s", ('legeorg2004@gmail.com',))
cursor.execute("SELECT (cart) FROM users WHERE email=%s", (email_user,))
conn.commit()
print(cursor.fetchone())

# async def test():
#     pool = await aiopg.create_pool("dbname=delivery_base user=postgres password=1234")
#     async with pool.acquire() as conn:
#         async with conn.cursor() as cursor:
#             await cursor.execute("SELECT * FROM products")
#             async for i in cursor:
#                 print(i)

# asyncio.run(test())