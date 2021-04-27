import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchGuestCart } from "../store/guestCart";
import EditGuestCart from "./EditGuestCart";

class GuestCart extends React.Component {
	constructor() {
		super();
		this.handleDelete = this.handleDelete.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		const filteredArr = Object.keys(localStorage);
		let guestProducts = filteredArr.filter((num) => isNaN(num) === false);
		this.props.getGuestCart(guestProducts);
	}

	handleDelete(id) {
		localStorage.removeItem(id);
		const filteredArr = Object.keys(localStorage);
		let guestProducts = filteredArr.filter((num) => isNaN(num) === false);
		this.props.getGuestCart(guestProducts);
	}

	handleSubmit(id) {
		const filteredArr = Object.keys(localStorage);
		let guestProducts = filteredArr.filter((num) => isNaN(num) === false);
		this.props.getGuestCart(guestProducts);
	}

	render() {
		const { products } = this.props;
		const hasProducts = products && products.length;
		const { handleChange, handleSubmit, handleCheckout } = this;
		let subtotal = 0;

		return (
			<div className='container'>
				{hasProducts > 0 ? (
					products.map((product) => (
						<div key={product.id}>
							<div className='card md-3 my-1'>
								<div className='row '>
									<Link to={`/products/${product.id}`}>
										<h3 className='display-5'>{product.name}</h3>
									</Link>
									<h5 className='mx-1'>
										Quantity: {localStorage.getItem(product.id)}
									</h5>
									<div className='container mx-1'>
										<EditGuestCart
											productId={product.id}
											quantity={localStorage.getItem(product.id)}
										/>
									</div>
									<div className='mx-1'>
										<button
											className='btn btn-sm btn-outline-secondary my-1'
											type='submit'
											onClick={() => this.handleSubmit(product.id)}>
											Update Quantity
										</button>
									</div>

									<p className='mx-1 my-1'>
										Subtotal:{" "}
										{`$ ${
											(product.price * localStorage.getItem(product.id)) /
											Math.pow(10, 2)
										}`}
									</p>
									<div className='card-body pt-0'>
										<div>
											<button
												className='remove btn btn-sm btn-outline-secondary my-1'
												onSubmit={(ev) => ev.preventDefault()}
												onClick={() => this.handleDelete(product.id)}>
												Delete
											</button>
											<div className='hiddenTotal'>
												<p>
													Running Subtotal:
													{
														(subtotal +=
															(product.price *
																localStorage.getItem(product.id)) /
															Math.pow(10, 2))
													}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					<h1 className='display-5'>Your cart is empty.</h1>
				)}
				<div className='my-1'>Total: $ {subtotal.toFixed(2)}</div>
				<button className='btn btn-sm btn-outline-secondary my-1'>
					<Link to='/loginOrSignUp'>Checkout</Link>
				</button>
			</div>
		);
	}
}

const mapState = (state) => {
	return {
		products: state.guestCart,
		isLoggedIn: !!state.auth.id,
	};
};

const mapDispatch = (dispatch) => ({
	getGuestCart: (products) => dispatch(fetchGuestCart(products)),
});

export default connect(mapState, mapDispatch)(GuestCart);
