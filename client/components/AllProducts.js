import React from 'react';
import { fetchProducts } from '../store/allProducts'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'


// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllProducts extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount(){
    this.props.getProducts()
  }


  render() {
    const { products } = this.props 
    return (
      <div>
        <div className='allProducts'>
        {
          products.map(product => (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
              <h3>Product Name: {product.name}</h3>
              <img  src={product.imageUrl} alt={product.name} />
              </Link>
              <p>Price: {product.price}</p>
            </div>
          ))
        }
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  products: state.products
});

const mapDispatch = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
});

export default connect(mapState, mapDispatch)(AllProducts);