import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import ErrorMesage from '../vendor/ErrorMesage';
import axios from 'axios';

const AddItem = () => {
	const navigate = useNavigate();
	const [info, setInfo] = useState({
		message: 'Проверьте заполнены ли поля название или цена',
		status: false
	});
	const [addform, setAddform] = useState({});

	const setter = () => {
		setInfo({...info, status: false});
	}

	const handlerfile = (e) => {
		if (e.target.files) {
			const reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.onload = (e1) => {
				setAddform({...addform, file: e1.target.result});
			}
		}
	}

	const sendData = () => {
		if (addform.title === "" || addform.price === "") {
			setInfo({...info, status: true});
			return;
		}
		axios.post('/api/add/item', addform);
		setTimeout(() => navigate('/'), 10);
	}

	if (localStorage.getItem('super_user') !== "1") setTimeout(() => navigate('/'), 0);
	return (
		<form className="AddItem">
			<h2>Добавление товара</h2>
			<input type="text" placeholder='Введите название' onChange={(e) => setAddform({...addform, title: e.target.value})}/>
			<input type="number" placeholder='Введите цену' onChange={(e) => setAddform({...addform, price: e.target.value})}/>
			<input type="file" accept='.png, .jpg, .jpeg' onChange={handlerfile}/>
			<textarea placeholder='Описание товара' cols="30" rows="10" onChange={(e) => setAddform({...addform, description: e.target.value})}></textarea>
			<input type="button" className='AddItemBut' onClick={sendData} value="Добавить товар"/>
			{
			(info.status)
			&& (<ErrorMesage seter={setter} message={info}/>)
			}
		</form>
	)
}

export default AddItem;