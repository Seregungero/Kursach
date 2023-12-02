import React, { useState } from 'react';
import sha256 from "crypto-js/sha256";
import axios from 'axios';
import ErrorMesage from '../vendor/ErrorMesage';
import { useNavigate } from "react-router-dom";

const SignIn = ({ admins }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		email: '',
		password: ''
	});
	const [info, setInfo] = useState({
		message: '',
		status: false
	});

	const infoFalse = () => {
        setInfo({...info, status: false});
    }

	const getUser = () => {
		setUser({...user, password: sha256(user.password).toString()});
		axios.post('/login', user)
		.then((res) => {
			if (res.data.Message === "User not found") {
				setInfo({message: "Пользователь не найден", status: true});
			} else {
				localStorage.setItem("user_name", res.data.name);
                localStorage.setItem("user_surname", res.data.surname);
                localStorage.setItem("user_email", res.data.email);
                localStorage.setItem("user_tel", res.data.tel);
                localStorage.setItem("super_user", (admins.includes(res.data.email) !== false) ? "1" : "0");
				navigate('/');
			}
		});
	}

	return (<>
		<form className='SignIn'>
			<input type="email" name="email" placeholder='Введите email' onChange={(e) => setUser({...user, email: e.target.value})} />
			<input type="password" name="password" placeholder='Введите пароль' onChange={(e) => setUser({...user, password: e.target.value})} />
			<input type="button" value="Войти" onClick={ getUser } />
		</form>
		{(info.status) ? (<ErrorMesage message={info} seter={infoFalse} />): undefined}
	</>)
}

export default SignIn