import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import ViewProfile from './ViewProfile';
import CartUser from './CartUser';
import AddItem from './AddItem';
import AddOrder from './AddOrder';

const Main = ({ admins }) => {
	return (
		<main className="Main">
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/cart' element={<CartUser />} />
				<Route path='/cart/add/order' element={<AddOrder />} />
				<Route path='/userinfo' element={<ViewProfile />} />
				<Route path='/add/item' element={<AddItem />} />
				<Route path='/register' element={<SignUp admins={admins} />} />
				<Route path='/login' element={<SignIn admins={admins} />} />
			</Routes>
		</main>
	)
}

export default Main;
