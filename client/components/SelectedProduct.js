import React from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { fetchProduct } from "../store/singleProduct";

class SelectedProduct extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)

  }

  componentDidMount() {
    console.log('this is this.props --->', this.props)
    try {
    this.props.getSingleProduct(this.props.match.params.id);
    console.log('this is this.props --->', this.props)
    } catch (error) {
      console.log(error)
    }
  }

  handleSubmit(id) {
    let quan = 1
    if (localStorage.getItem(id) >= 1) {
      quan = localStorage.getItem(id)
      quan++
    }
    localStorage.setItem(id, quan)
}



  render() {
    const {product} = this.props
    console.log('this is this.props --->', this.props)
    console.log('this is product --->', product)

    return (
      <div>
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            height="200"
            width="250"
          />
          <div>
            <h1>Name: {product.name}</h1>
            <h3>Price: {product.price}</h3>
            <h3>In Stock: {product.inventory}</h3>
            <h3>Description: {product.description}</h3>
            <button
             className='add-to-cart'
             onSubmit={(ev) => ev.preventDefault()}
             onClick={() => this.handleSubmit(product.id)}>
            Add To Cart</button>
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
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.singleProduct,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleProduct: (id) => dispatch(fetchProduct(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedProduct);
