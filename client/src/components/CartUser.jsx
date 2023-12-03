import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CartUser = () => {
	const [products, setProducts] = useState({
		success: false,
		products: [],
		message: ""
	});
	useEffect(() => get_cart, [])
	const get_cart = () => {
		axios.post('/api/cart/get_products', {email: localStorage.getItem('user_email')})
		.then((resp) => {
			setProducts(resp.data);
		});
	}
	const remove_cart = (idi) => {
		axios.post('/api/cart/remove/' + idi, {email: localStorage.getItem('user_email')})
	}
	return (
		<div className="CartUser">
			{
			(products.success)
			? (
				products.products.map((c) => {
					return <div className="card" key={c.id}>
						<img src={"http://localhost:5000/api/img/" + c.image} />
						<hr/>
						<span>Название</span>
						<p>{c.title}</p>
						<span>Описание</span>
						<p>{c.description}</p>
						<span>Цена</span>
						<p>{c.price} руб.</p>
						<button className='OutCart' onClick={() => {
							remove_cart(c.id);
							setTimeout(get_cart, 1000);
							//get_cart();
							}}>убрать из карзины</button>
					</div>
				})
			)
			: (<h1>{products.message}</h1>)
			}
		</div>
	)
}

export default CartUser;