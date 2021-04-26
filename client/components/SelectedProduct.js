import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../store/cart";
import { fetchProduct } from "../store/singleProduct";

class SelectedProduct extends React.Component {
	componentDidMount() {
		try {
			this.props.getSingleProduct(this.props.match.params.id);
		} catch (error) {
			console.log(error);
		}
	}
	render() {
		const { product } = this.props;
		console.log(this.props);

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
							<div className='card-body pt-0'>
								<h2 className='card-title display-5'>{product.name}</h2>
							</div>
							<div className='card-text'>
								<h5>${product.price}</h5>
								<h5>In stock: {product.inventory}</h5>
								<h5>{product.description}</h5>
								<button
									onClick={() =>
										this.props.addToCart(this.props.userId, product.id)
									}>
									Add to Cart
								</button>
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getSingleProduct: (id) => dispatch(fetchProduct(id)),
		addToCart: (userId, productId) => dispatch(addToCart(userId, productId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedProduct);
