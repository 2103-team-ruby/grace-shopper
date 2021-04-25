import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../store/cart";
// import { Link } from "react-router-dom";
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
			<div>
				<div>
					<img
						src={product.imageUrl}
						alt={product.name}
						height='200'
						width='250'
					/>
					<div>
						<h1>Name: {product.name}</h1>
						<h3>Price: {product.price}</h3>
						<h3>In Stock: {product.inventory}</h3>
						<h3>Description: {product.description}</h3>
						<button
							onClick={() =>
								this.props.addToCart(this.props.userId, product.id)
							}>
							Add to Cart
						</button>

						{/* <Link to={`${singleProduct.id}/edit`}> //for admin
              <button>
                Edit
              </button>
            </Link> */}
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
