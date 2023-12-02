import React, { useState } from 'react'
import ChoiceMesage from '../vendor/ChoiceMesage'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewProfile = ({ admins }) => {
	const navigate = useNavigate();
	const [info, setInfo] = useState({
		message: "",
		status: false
	})

	const ProofOk = () => {
		axios.post('/delete_user', {email: localStorage.getItem('user_email')});
		localStorage.clear();
		navigate('/register');
	}
	const ProofNo = () => {
		setInfo({...info, status: false});
	}

	return (
		<div className="ViewProfile">
			<span>Имя</span>
			<p>{localStorage.getItem('user_name')}</p>
			<span>Фамилия</span>
			<p>{localStorage.getItem('user_surname')}</p>
			<span>Почта</span>
			<p>{localStorage.getItem('user_email')}</p>
			<span>Телефон</span>
			<p>{localStorage.getItem('user_tel')}</p>
			{
				(admins.includes(localStorage.getItem('user_email')))
					? (<h1>Вы Администратор!!!</h1>)
					: undefined}
			<button onClick={() => setInfo({message: "Вы уверены что хотите удалить аккаунт?", status: true})}>
				Удалить аккаунт
			</button>
			{(info.status)
			? (<ChoiceMesage setter={info} ok={ProofOk} no={ProofNo}/>)
			: (undefined)
			}
		</div>
	)
}

export default ViewProfile