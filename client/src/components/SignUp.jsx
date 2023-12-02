import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMesage from "../vendor/ErrorMesage";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import { validate } from "react-email-validator";
import sha256 from "crypto-js/sha256";
import axios from 'axios';

const SignUp = ({ admins }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        tel: ""
    });
    const [info, setInfo] = useState({
        status: false,
        message: "",
    });

    const sendFormRegister = () => {
        
        if (!validate(user.email)) {
            setInfo({message: "Неверный email", status: true});
            return;
        }
        if (user.name.length * user.surname.length === 0) {
            setInfo({message: "Проверьте заполнены ли поля имени или фамилии", status: true});
            return;
        }
        if (user.password.length * user.tel.length === 0) {
            setInfo({message: "Проверьте заполнены ли поля пароля или телефона", status: true});
            return;
        }
        console.log(user);
        axios.post("/register", user)
        .then((res) => {
            if (res.data.Message === "User already exists") {
                setInfo({message: "Пользователь уже существует", status: true});
            } else {
                localStorage.setItem("user_name", user.name);
                localStorage.setItem("user_surname", user.surname);
                localStorage.setItem("user_email", user.email);
                localStorage.setItem("user_tel", user.tel);
                localStorage.setItem("super_user", (admins.includes(user.email) !== false) ? "1" : "0");
                return navigate("/");
            }
        })
    };

    const infoFalse = () => {
        setInfo({...info, status: false});
    }

    const isTruePass = (e) => {
        if (e.target.value.length < 3) {
            setInfo({message: "Пароль Должен быть минимум 3 символа", status: true});
            return;
        }
        setUser({...user, password: sha256(e.target.value).toString()});
    }

    return (<div>
        <form className="SignUp">
            <input type="text" placeholder="Введите имя" onChange={(e) => setUser({...user, name: e.target.value})}/>
            <input type="text" placeholder="Введите фамилию" onChange={(e) => setUser({...user, surname: e.target.value})}/>
            <input type="email" name="email" placeholder="Введите email" onChange={(e) => setUser({...user, email: e.target.value})}/>
            <input type="password" name="password" placeholder="Введите пароль" onBlur={isTruePass}/>
            <input type="tel" name="tel" placeholder="Введите свой номер телефона" onBlur={(e) => {
                (isValidPhoneNumber(e.target.value, "RU"))
                ? (setUser({...user, tel: parsePhoneNumber(e.target.value, "RU").number}))
                : (setInfo({message: "Неверный номер телефона", status: true}));
            }}/>
            <input type="button" value="Зарегестрироваться" onClick={sendFormRegister}/>
        </form>
        {(info.status) ? <ErrorMesage message={info} seter={infoFalse} /> : ""}
    </div>
    );
}

export default SignUp;