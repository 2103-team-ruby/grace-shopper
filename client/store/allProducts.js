import axios from 'axios'

const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'

export const setProducts = (products) => ({
  type: GOT_ALL_PRODUCTS,
  products
})

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/products/')
      const products = response.data
      dispatch(setProducts(products))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = [];

export default function allProductsReducer(state = initialState, action){
  switch(action.type){
    case GOT_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}
