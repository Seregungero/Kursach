import React, { useState } from 'react';
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
	const [addres, setAddres] = useState([])
	const sendOrder = (e) => {
		let addres = e.target.value;
		options.body = JSON.stringify({query: addres});
		fetch(url, options)
		.then(res => res.json())
		.then(res => setAddres(res.suggestions));
	}

	return (
		<div className="AddOrder">
			<h4>Выберите адрес</h4>
			<input type="text" onChange={sendOrder} placeholder='Введите адрес' list='cities'/>
			<datalist id="cities">
				{
					addres.map((elem, id) => <option key={id} value={elem.value}/>)
				}
			</datalist>
		</div>
	)
}

export default AddOrder