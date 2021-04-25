import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCart, deleteProduct } from "../store/cart";
import { Link } from "react-router-dom";
import TestEditCart from "./TestEditCart";

class TestCart extends Component {
	componentDidMount() {
		this.props.loadCart(this.props.userId);
	}

	render() {
		const cart = this.props.cart || [];
		console.log(this.props);
		return (
			<div>
				{cart.map((order) => (
					<div key={order.product.id}>
						<h1>{order.product.name}</h1>
						<h3>Quantity: {order.quantity || {}}</h3>
						{/* <div>
							<TestEditCart
								userId={this.props.userId}
								productId={product.id}
								quantity={product.productOrder.quantity}
							/>
						</div> */}

						<button
							onClick={() =>
								this.props.deleteItem(this.props.userId, order.product.id)
							}>
							Delete
						</button>
					</div>
				))}
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TestCart);
