import axios from 'axios'

const GOT_PRODUCT = 'GOT_PRODUCT'

export const setProduct = (product) => ({
  type: GOT_PRODUCT,
  product
})

export const fetchProduct = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/product/${id}`)
      const product = response.data
      dispatch(setProduct(product))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {};

export default function singleProductReducer(state = initialState, action){
  switch(action.type){
    case GOT_PRODUCT:
      return action.product
    default:
      return state
  }
}
