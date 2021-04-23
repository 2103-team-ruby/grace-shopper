import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { fetchGuestCart } from '../store/guestCart';



export class GuestCart extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        quantity: ""
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
      const filteredArr = Object.keys(localStorage)
      let guestProducts = filteredArr.filter(num => isNaN(num) === false)
      console.log('this is the filtered array --->', guestProducts)
      this.props.getGuestCart(guestProducts)
  }

//   componentDidUpdate(){
//     const filteredArr = Object.keys(localStorage)
//     let guestProducts = filteredArr.filter(num => isNaN(num) === false)
//     this.props.getGuestCart(guestProducts)
//   }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleDelete(id) {
      localStorage.removeItem(id)
      const filteredArr = Object.keys(localStorage)
     let guestProducts = filteredArr.filter(num => isNaN(num) === false)
     this.props.getGuestCart(guestProducts)
      
  }


  render() {
    console.log('this is this.props -->', this.props)
    const { products } = this.props
    const { handleChange} = this;
    const { quantity } = this.state
    return (
    <div> 
        <h1>Your Shopping Cart</h1>
        <div className='cart'>
            
            {products.map(product => (
            <div key={product.id}>
                <Link to={`/products/${product.id}`}>
                    <h3>Product: {product.name}</h3>
                    <img src={product.imageUrl} alt={product.name} />
                </Link>
                <p>Price: {`$ ${product.price}`}</p>
                <p>Quantity: {localStorage.getItem(product.id)}</p>
                <button 
                    className='remove'
                    onSubmit={(ev) => ev.preventDefault()}
                    onClick={() => this.handleDelete(product.id)}>
                    Delete Product
                </button>
                <div>
                    <form id='update-product-form' >
                    <label htmlFor='quantity'>Quantity :</label>
                    <input type="email" className="update-forml" onChange={handleChange} value={quantity} />
                    <button type='submit'>Update Quantity</button>
                    </form>
                </div>
            </div>
            ))
            }
            <div>
                <button className='checkout'
                onSubmit={(ev) => ev.preventDefault()}
               >Checkout</button>
            </div>
        </div>
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

