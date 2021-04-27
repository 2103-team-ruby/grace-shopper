import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../store/cart";
import { fetchProduct } from "../store/singleProduct";

class SelectedProduct extends React.Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		try {
			this.props.getSingleProduct(this.props.match.params.id);
		} catch (error) {
			console.log(error);
		}
	}

	handleSubmit(id) {
		let quan = 1;
		if (localStorage.getItem(id) >= 1) {
			quan = localStorage.getItem(id);
			quan++;
		}
		localStorage.setItem(id, quan);
	}

	render() {
		const { product } = this.props;
		return (
			<div className='container'>
				<div className='card my-3'>
					<div className='row g-0'>
						<div className='col-md-4'>
							<img
								src={product.imageUrl}
								alt={product.name}
								className='img-fluid'
							/>
						</div>
						<div className='col-md-8'>
							<div className='card-body '>
								<h2 className='card-title display-5'>{product.name}</h2>
							</div>
							<div className='card-text p-3'>
								<h5>${product.price}</h5>
								<h5>In stock: {product.inventory}</h5>
								<h5>{product.description}</h5>
								{this.props.isLoggedIn ? (
									<button
										className='btn btn-sm btn-outline-secondary my-1'
										onClick={() =>
											this.props.addToCart(this.props.userId, product.id)
										}>
										Add to Cart
									</button>
								) : (
									<button
										className='btn btn-sm btn-outline-secondary my-1'
										onSubmit={(ev) => ev.preventDefault()}
										onClick={() => this.handleSubmit(product.id)}>
										Add to Cart
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		product: state.singleProduct,
		userId: state.auth.id,
		isLoggedIn: !!state.auth.id,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getSingleProduct: (id) => dispatch(fetchProduct(id)),
		addToCart: (userId, productId) => dispatch(addToCart(userId, productId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedProduct);
