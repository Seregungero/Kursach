import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from 'axios';
import ErrorMesage from '../vendor/ErrorMesage';

const Dashboard = () => {
	const [cards, setCards] = useState([]);
	const [info, setInfo] = useState({
		message: "у вас уже лежит этот товар в корзине",
		status: false
	})
	useEffect(() => get_products, []);

	const get_products = () => {
		axios.get('/api/products')
		.then((res) => {
			setCards(res.data);
		})
	}

	const seter = () => {
		setInfo({...info, status: false});
	}

	const add_cart = (id_product) => {
		axios.post('/api/cart/add/' + id_product, {email: localStorage.getItem('user_email')})
		.then((resp) => {
			if (resp.data !== 'success') {
				setInfo({message: resp.data, status: true});
			}
		})
	}

	return (
		<div className="Dashboard">
			{
				cards.map((c) => 
					<div className="card" key={c.id}>
						{(localStorage.getItem("super_user") == "1") && <FaRegTrashAlt className="AdminIcon" onClick={() => {
							axios.get("/api/delete/product/" + c.image + '/' + c.id);
							get_products();
						}}/>}
						<img src={"http://localhost:5000/api/img/" + c.image} />
						<hr/>
						<span>Название</span>
						<p>{c.title}</p>
						<span>Описание</span>
						<p>{c.description}</p>
						<span>Цена</span>
						<p>{c.price} руб.</p>
						<button className='InCart' onClick={() => add_cart(c.id)}>В корзину</button>
					</div>
				)
			}
			{
				(info.status) && (<ErrorMesage message={info} seter={seter}/>)
			}
		</div>
	)
}

export default Dashboard;