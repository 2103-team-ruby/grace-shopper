import React, { Component } from "react";
import { editCart } from "../store/cart";
import { connect } from "react-redux";

class EditGuestCart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quantity: localStorage.getItem(this.props.productId),
		};

		this.handleChange = this.handleChange.bind(this);
	}

	async handleChange(evt) {
		await this.setState({
			quantity: evt.target.value,
		});
		const quantity = Number(this.state.quantity);
		localStorage.setItem(this.props.productId, quantity);
	}

	render() {
		return (
			<div className='mx-1'>
				<div>Quantity:</div>
				<form id='quantity-form'>
					<select value={this.state.quantity} onChange={this.handleChange}>
						<option value='1'>1</option>
						<option value='2'>2</option>
						<option value='3'>3</option>
						<option value='4'>4</option>
						<option value='5'>5</option>
						<option value='6'>6</option>
						<option value='7'>7</option>
						<option value='8'>8</option>
						<option value='9'>9</option>
						<option value='10'>10</option>
					</select>
				</form>
			</div>
		);
	}
}

export default EditGuestCart;
