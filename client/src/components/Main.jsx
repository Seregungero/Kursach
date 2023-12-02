import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import ViewProfile from './ViewProfile';

const Main = ({ admins }) => {
	return (
		<main className="Main">
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/register' element={<SignUp admins={admins} />} />
				<Route path='/login' element={<SignIn admins={admins} />} />
				<Route path='/userinfo' element={<ViewProfile admins={admins} />} />
			</Routes>
		</main>
	)
}

export default Main;
