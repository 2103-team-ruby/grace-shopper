import axios from "axios";

const GOT_ALL_GUEST_CART_PRODUCTS = "GOT_ALL_GUEST_CART_PRODUCTS";


export const setGuestProducts = (products) => ({
    type: GOT_ALL_GUEST_CART_PRODUCTS,
    products,
  });
  

  export const fetchGuestCart = (guestProducts) => {
    return async (dispatch) => {
      try {
          console.log('this is guest products --->', guestProducts)
        const response = await axios.put(`/api/cart`, {guestProducts}
        );
        const guestCart = response.data;
        console.log('this is response --> ', response)
        console.log('this is guestCart --> ', guestCart)
        dispatch(setGuestProducts(guestCart));
      } catch (error) {
        console.log(error);
      }
    };
  };

  const initialState = [];

  export default function guestCartReducer(state = initialState, action) {
    switch (action.type) {
      case GOT_ALL_GUEST_CART_PRODUCTS:
        return action.products;
      default:
        return state;
    }
  }