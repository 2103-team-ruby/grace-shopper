import React from "react";
import { fetchProducts } from "../store/allProducts";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllProducts extends React.Component {
	componentDidMount() {
		this.props.getProducts();
	}

	render() {
		const { products } = this.props;
		return (
			<div className='container'>
				<div className='allProducts'>
					<div className='album py-5 bg-light'>
						<div className='container'>
							<div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
								{products.map((product) => (
									<div className='col' key={product.id}>
										<div className='card shadow-sm'>
											<img
												className='card-img-top'
												preserveAspectRatio='xMidYMid slice'
												src={product.imageUrl}
												alt={product.name}
											/>
											<div className='card-body text-center'>
												<Link to={`/products/${product.id}`}>
													<h3>{product.name}</h3>
												</Link>
												<p>${product.price}</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapState = (state) => ({
	products: state.allProducts,
});

const mapDispatch = (dispatch) => ({
	getProducts: () => dispatch(fetchProducts()),
});

export default connect(mapState, mapDispatch)(AllProducts);
