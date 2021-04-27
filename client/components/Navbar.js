import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, userId }) => (
	<div className='container'>
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<div className='container-fluid'>
				<span className='navbar-brand display-1' href='#'>
					Grace Hopper
				</span>
			</div>
			<button
				className='navbar-toggler'
				type='button'
				data-bs-toggle='collapse'
				data-bs-target='#navbarNav'
				aria-controls='navbarNav'
				aria-expanded='false'
				aria-label='Toggle navigation'>
				<span className='navbar-toggler-icon'></span>
			</button>
			<div className='collapse navbar-collapse' id='navbarNav'>
				{isLoggedIn ? (
					<ul className='navbar-nav'>
						<Link to='/' className='nav-item nav-link'>
							Products
						</Link>
						<a href='#' className='nav-item nav-link' onClick={handleClick}>
							Logout
						</a>
						<Link to='/cart' className='nav-item nav-link'>
							Cart
						</Link>
						<Link to={`/users/${userId}/profile`} className='nav-item nav-link'>
							Profile
						</Link>
					</ul>
				) : (
					<ul className='navbar-nav'>
						{/* The navbar will show these links before you log in */}
						<Link to='/' className='nav-item nav-link'>
							Products
						</Link>
						<Link to='/login' className='nav-item nav-link'>
							Login
						</Link>
						<Link to='/signup' className='nav-item nav-link'>
							Sign Up
						</Link>
						<Link to='/guestCart' className='nav-item nav-link'>
							Cart
						</Link>
					</ul>
				)}
			</div>
		</nav>
		<hr />
	</div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		isLoggedIn: !!state.auth.id,
		userId: state.auth.id,
	};
};

const mapDispatch = (dispatch) => {
	return {
		handleClick() {
			dispatch(logout());
		},
	};
};

export default connect(mapState, mapDispatch)(Navbar);
