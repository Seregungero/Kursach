import logging, asyncio
from datetime import date
from aiogram import Bot, Dispatcher, types
from aiogram.filters.command import Command
from DB import *

TOKEN = '6578630592:AAFvWTVmpjg9IoDSDG2DCfM47RQiPYsqR6U'

logging.basicConfig(level=logging.INFO)

bot = Bot(TOKEN)
dp = Dispatcher()

global_users = dict()

@dp.message(Command('start'))
async def welcome(mes: types.Message):
    global_users[mes.from_user.id] = {'email': '', 'password': ''}
    await mes.answer("Введите данные для просмотря статуса заказа")
    await mes.answer("Введите почту")

@dp.message()
async def test(mes: types.Message):
    key = mes.from_user.id
    if key not in global_users:
        global_users[key] = {'email': '', 'password': ''}
        await mes.answer('Введите почту')
    elif global_users[key]['email'] == '':
        global_users[key]['email'] = mes.text
        await mes.answer('Введите пароль')
    else:
        global_users[key]['password'] = mes.text
        res = session(global_users[key]['email'], global_users[key]['password'])
        if type(res) == str:
            await mes.answer(res + " 🔴")
        elif res == []:
            await mes.answer("У вас нет заказов 🟡")
        else: # 🟡 🔴 🟢 🔵
            for i in res:
                MESSAGE = ""
                order_id = i[0]
                date_order: date = i[2]
                title_order = i[3]
                addres = i[5]
                ostatok = (date.today() - date_order).days
                if ostatok >= 7:
                    MESSAGE += "🟢 Товар пришел\n"
                else:
                    MESSAGE += f"🔵 Товар в пути, кол-во дней до прибытия: {7 - ostatok}\n"
                MESSAGE += f"ID Заказа: {order_id}\n"
                MESSAGE += f"Название Товара: {title_order}\n"
                MESSAGE += f"Адрес доставки: {addres}"
                print(MESSAGE)
                await mes.answer(MESSAGE)
        global_users[key] = {'email': '', 'password': ''}


async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())