import { Link, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingBag, FaSignInAlt, FaShoppingCart } from "react-icons/fa";
import { IoMdLogOut, IoMdLogIn } from "react-icons/io";

const Header = () => {
    const navigate = useNavigate();
    const authorization = (localStorage.getItem('user_email') === null)
    ?
    (<>
        <li>
            <Link to='/register'>
                <FaSignInAlt className="MyIcon"/>
                Регистрация
            </Link>
        </li>
        <li>
            <Link to='/login'>
                <IoMdLogIn className="MyIcon"/>
                Вход
            </Link>
        </li>
    </>)
    :
    (<>
        <li>
            
            <Link to="/userinfo">
                <FaRegCircleUser className="MyIcon"/>
                Профиль
            </Link>
        </li>
        <li>
            <Link to="/cart">
                <FaShoppingCart className="MyIcon"/>
                Корзина
            </Link>
        </li>
        <li>
            <a className="Danger" onClick={() => {
                localStorage.clear();
                navigate('/login');
            }}>
                <IoMdLogOut className="MyIcon"/>
                Выйти
            </a>
        </li>
    </>)
    return (
        <header className="Header">
            <ul>
                <li>
                    <Link to='/'>
                        <FaShoppingBag className="MyIcon"/>
                        Магазин
                    </Link>
                </li>
                {authorization}
            </ul>
        </header>
    )
}

export default Header;