import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCart, deleteProduct, submitOrder } from "../store/cart";
import TestEditCart from "./TestEditCart";

class TestCart extends Component {
	componentDidMount() {
		this.props.loadCart(this.props.userId);
	}

	render() {
		const cart = this.props.cart;

		return (
			<div className='container'>
				{cart.length !== 0 ? (
					cart.map((order) => (
						<div key={order.product.id}>
							<div className='card md-3 '>
								<div className='row '>
									<h1 className='display-5 mx-1'>{order.product.name}</h1>
									<h5 className='mx-1'>Quantity: {order.quantity || {}}</h5>
									<div className='container'>
										<TestEditCart
											userId={this.props.userId}
											productId={order.product.id}
											quantity={order.quantity}
										/>
									</div>
									<div className='card-body pt-0'>
										<div className='btn-group'>
											<button
												className='btn btn-sm btn-outline-secondary my-1'
												onClick={() =>
													this.props.deleteItem(
														this.props.userId,
														order.product.id
													)
												}>
												Delete
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					<h1 className='display-5'>Your cart is empty.</h1>
				)}

				<button
					className='btn btn-sm btn-outline-secondary my-3'
					onClick={() =>
						this.props.checkout(this.props.userId, cart[0].orderId)
					}>
					Checkout
				</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cart: state.cartProducts,
		userId: state.auth.id,
	};
};

const mapDispatchToProps = (dispatch, { history }) => {
	return {
		loadCart: (id) => dispatch(fetchCart(id)),
		deleteItem: (userId, productId) =>
			dispatch(deleteProduct(userId, productId, history)),
		checkout: (userId, orderId) => dispatch(submitOrder(userId, orderId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TestCart);
