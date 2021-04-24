import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { fetchGuestCart } from '../store/guestCart';



export class GuestCart extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        quantity: 1
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleDelete = this.handleDelete.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleCheckout = this.handleCheckout.bind(this)
  }

  componentDidMount() {
      const filteredArr = Object.keys(localStorage)
      let guestProducts = filteredArr.filter(num => isNaN(num) === false)
      console.log('this is the filtered array --->', guestProducts)
      this.props.getGuestCart(guestProducts)
  }


  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(id){
    if (this.state.quantity < 1) {
        this.state.quantity = 1
    }
    localStorage.setItem(id, this.state.quantity)
    const filteredArr = Object.keys(localStorage)
    let guestProducts = filteredArr.filter(num => isNaN(num) === false)
    this.props.getGuestCart(guestProducts)
  }

  handleDelete(id) {
      localStorage.removeItem(id)
      const filteredArr = Object.keys(localStorage)
     let guestProducts = filteredArr.filter(num => isNaN(num) === false)
     this.props.getGuestCart(guestProducts)
     
      
  }

  handleCheckout(){
    localStorage.clear()
    const filteredArr = Object.keys(localStorage)
     let guestProducts = filteredArr.filter(num => isNaN(num) === false)
     this.props.getGuestCart(guestProducts)
  }


  render() {
    console.log('this is this.props -->', this.props)
    const { products } = this.props
    const hasProducts = products && products.length
    const { handleChange, handleSubmit, handleCheckout} = this;
    const { quantity } = this.state
    let subtotal = 0
    return (
    <div> 
        <h1>Your Shopping Cart</h1>
        {hasProducts > 0 ? (
        <div className='cart'>
            
            {products.map(product => (
            <div key={product.id}>
                <Link to={`/products/${product.id}`}>
                    <h3>Product: {product.name}</h3>
                    <img src={product.imageUrl} alt={product.name} />
                </Link>
                <p>Price: {`$ ${product.price * localStorage.getItem(product.id)}`}</p>
                <p>Quantity: {localStorage.getItem(product.id)}</p>
                <button 
                    className='remove'
                    onSubmit={(ev) => ev.preventDefault()}
                    onClick={() => this.handleDelete(product.id)}>
                    Delete Product
                </button>
                <div>
                    <form id='update-product-form' onSubmit={(ev) => ev.preventDefault()}>
                    <label htmlFor='quantity'>Quantity :</label>
                    <input name={`quantity`} type="number" className="update-forml" onChange={handleChange} value={quantity} />
                    <button type='submit'  onClick={() => this.handleSubmit(product.id)}>Update Quantity</button>
                    </form>
                </div>
                <div className="hiddenTotal">
                <p>Running Subtotal:{subtotal += product.price * localStorage.getItem(product.id)}</p>
                </div>
            </div>
            ))
            }
            <div>

                <div>
                    <p>Your subtotal is: {subtotal}</p>
                </div>
                <button className='checkout'
                onSubmit={(ev) => ev.preventDefault()}
                onClick={() => this.handleCheckout()}
               >Checkout</button>
            </div>
        </div>

        ) : (
            <p>There are no products in your cart!</p>
        )}
    </div>
    )
  }
}

const mapState = (state) => {
    console.log('this is the state --->', state)
    return {
         products: state.guestCart,
    }
};
  
  const mapDispatch = (dispatch) => ({
    getGuestCart: (products) => dispatch(fetchGuestCart(products)),
  });
  
  export default connect(mapState, mapDispatch)(GuestCart);

