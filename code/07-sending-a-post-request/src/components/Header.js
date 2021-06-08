import React from 'react';
import './Header.css';
import logo from './react-icon.png';

export default function Header() {
	return (
		<div className='header'>
			<img src={logo} alt='logo' className='logo' />
			<h1>Post e Get Http Request</h1>
		</div>
	);
}
