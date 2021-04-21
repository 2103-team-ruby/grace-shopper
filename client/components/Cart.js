import React from 'react';
import { connect } from 'react-redux';
import { deleteProduct, fetchCart } from '../store/cart'
import {Link} from 'react-router-dom'
import Order from '../../server/db/models/order';


export class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        quantity: 1
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    this.props.getCart(this.props.match.params.userId)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleDelete(id) {
    this.props.deleteProduct(id)
  }

  handleCheckout() {
    this.props.updateOrderStatus()
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateProductQuantity({ ...this.state});
    this.props.getCart(this.props.match.params.userId)
  }

  render() {
    const { cart } = this.props
    const hasProducts = cart.productOrder && cart.productOrder.length
    const { handleChange, handleSubmit} = this;
    const {quantity} = this.state
    return (
    <div> 
        <h1>Your Shopping Cart</h1>
        { hasProducts > 0 ? (
        <div className='cart'>
            
            {cart.productOrder.map(product => (
            <div key={product.id}>
                <Link to={`/products/${product.id}`}>
                    <h3>Product: {product.name}</h3>
                    <img src={product.imageUrl} alt={product.name} />
                </Link>
                <p>Price: {`$ ${product.price}`}</p>
                <button 
                    className='remove'
                    onSubmit={(ev) => ev.preventDefault()}
                    onClick={() => this.handleDelete(product.id)}>
                    Delete Product
                </button>
                <div>
                    <form id='update-product-form' onSubmit={handleSubmit}>
                    <label htmlFor='priority'>Quantity (max quantity of 10):</label>
                    <select id='dropdown' name='quantity' onChange={handleChange} value={quantity}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>

                    <button type='submit'>Update Quantity</button>
                    </form>
                </div>
            </div>
            ))
            }
            <div>
                <button className='checkout'
                onSubmit={(ev) => ev.preventDefault()}
                onClick={() => this.handleCheckout()}>Checkout</button>
                // ternary operator order.status === "complete" ? render success page + empty cart : stay on cart screen / do nothing
            </div>
        </div>
    ) : (
        <p>Your cart is currently empty!</p>
    )}
    </div>
    )
  }
}

const mapState = (state) => ({
  cart: state.cart
});

const mapDispatch = (dispatch) => ({
  getCart: () => dispatch(fetchCart()),
  deleteProduct: (id) => dispatch(deleteProduct(id)),
  updateOrderStatus: () => dispatch(updateOrderStatus()),
  updateProductQuantity: () => dispatch(updateProductQuantity())
});

export default connect(mapState, mapDispatch)(Cart);