import React from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { fetchProduct } from "../store/singleProduct";

class SelectedProduct extends React.Component {
  componentDidMount() {
    const { productId } = this.props.match.params;
    this.props.getSingleProduct(productId);
  }
  render() {
    const { singleProduct } = this.props;
    return (
      <div>
        <div>
          <img
            src={singleProduct.imageUrl}
            alt={singleProduct.name}
            height="200"
            width="250"
          />
          <div>
            <h1>Name: {singleProduct.name}</h1>
            <h3>Price: {singleProduct.price}</h3>
            <h3>In Stock: {singleProduct.inventory}</h3>
            <h3>Description: {singleProduct.description}</h3>
            <button>Buy Now</button>
            {/* <Link to="/cart">
              <button>Buy Now</button>
            </Link> */}

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

const mapState = (state) => {
  return {
    singleProduct: state.singleProduct,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleProduct: (productId) => dispatch(fetchProduct(productId)),
  };
};

export default connect(mapState, mapDispatch)(SelectedProduct);
