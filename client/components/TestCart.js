import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCart, deleteProduct, submitOrder } from "../store/cart";
import TestEditCart from "./TestEditCart";

class TestCart extends Component {
	componentDidMount() {
		this.props.loadCart(this.props.userId);
	}

	render() {
		const cart = this.props.cart || [];

		return (
			<div>
				{cart.map((order) => (
					<div key={order.product.id}>
						<h1>{order.product.name}</h1>
						<h3>Quantity: {order.quantity || {}}</h3>
						<div>
							<TestEditCart
								userId={this.props.userId}
								productId={order.product.id}
								quantity={order.quantity}
							/>
						</div>

						<button
							onClick={() =>
								this.props.deleteItem(this.props.userId, order.product.id)
							}>
							Delete
						</button>
					</div>
				))}
				<button
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
