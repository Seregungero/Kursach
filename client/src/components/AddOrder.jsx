import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import ErrorMesage from "../vendor/ErrorMesage";
import axios from 'axios';

let url = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
let token = "c803d9782e81386166981b00539f64b6be57839e";

let options = {
	method: "POST",
	mode: "cors",
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
		"Authorization": "Token " + token
	}
}


const AddOrder = () => {
	const navigate = useNavigate();
	const [addres, setAddres] = useState([])
	const [input_adr, setInput_adr] = useState(null);
	const [info, setInfo] = useState({
		message: "Введите адрес доставки",
		status: false
	})

	const setter = () => {
		setInfo({...info, status: false});
	}

	const sendOrder = (e) => {
		let adres = e.target.value;
		setInput_adr(e.target.value);
		options.body = JSON.stringify({query: adres});
		fetch(url, options)
		.then(res => res.json())
		.then(res => setAddres(res.suggestions));
	}

	const sendData = () => {
		if (input_adr + "1" == "1" || input_adr === null) {
			setInfo({...info, status: true});
		}
		else {
			axios.post('/api/order/add', {email: localStorage.getItem('user_email'), addres: input_adr})
			.then(() => {
				setInfo({message: 'Успешно, отслеживайте ваши товары в телеграм боте, ссылка в низу сайта', status: true});
				setTimeout(() => navigate('/'), 1500);
			})
		}
	}

	return (
		<div className="AddOrder">
			<h4>Выберите адрес</h4>
			<input type="text" className='AddOrderAddres' onChange={sendOrder} placeholder='Введите адрес' list='cities'/>
			<datalist id="cities">
				{
					addres.map((elem, id) => <option key={id} value={elem.value}/>)
				}
			</datalist>
			<input type="button" value="Подтвердить" className='SubmitOrderBut' onClick={sendData}/>
			{(info.status) && (<ErrorMesage message={info} seter={setter} />)}
		</div>
	)
}
//<ErrorMesage message={info} seter={infoFalse} />
export default AddOrder