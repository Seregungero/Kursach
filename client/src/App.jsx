import React, { useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import "./index.scss";

function App() {
	// ---------------- This list of admin users ------------------------
	const super_users_emails = [
		"legeorg2004@gmail.com",
		"german@gmail.com"
	]
	// ------------------------------------------------------------------
	return <div className="App">
		<Header />
		<hr />
		<Main admins={super_users_emails}/>
		<hr />
		<Footer />
	</div>
}


export default App;

	// const [data, setData] = useState([{}])

	// useEffect(() => {
	// 	fetch('/members').then(res => res.json()).then((res) => {
	// 		setData(res);
	// 	});
	// }, [])
	// digestMessage("qwerty12345").then(data => console.log(data));
	// return (
	// 	<div className="App">
	// 		{(typeof data.Members !== 'undefined') ? (
	// 			data.Members.map((member, i) => {
	// 				return <div key={i}>{member}</div>
	// 			})
	// 		) : (
	// 			<p>Loading...</p>
	// 		)}
	// 	</div>
	// );