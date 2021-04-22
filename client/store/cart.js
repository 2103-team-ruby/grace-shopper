import axios from "axios";

const GOT_ALL_CART_PRODUCTS = "GOT_ALL_CART_PRODUCTS";
const DELETED_FROM_CART = "DELETED_FROM_CART";
const EDITED_CART = "DELETED_FROM_CART";

export const setProducts = (products) => ({
  type: GOT_ALL_CART_PRODUCTS,
  products,
});

const deletedProduct = (product) => ({
  type: DELETED_FROM_CART,
  product,
});

const editedProudct = (product) => ({
  type: EDITED_CART,
  product,
});

export const fetchCart = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/users/${id}/cart`);
      const products = response.data;
      dispatch(setProducts(products));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteProduct = (product) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/users/${product.id}/cart`);
      dispatch(deletedProduct(products));
    } catch (error) {
      console.log(error);
    }
  };
};

export const editProduct = (product) => {
  return async (dispatch) => {
    const { data: updated } = await axios.put(
      `/api/products/${product.id}`,
      product
    );
    dispatch(editedProudct(updated));
  };
};

const initialState = [];

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_CART_PRODUCTS:
      return action.products;
    case DELETED_FROM_CART:
      return state.filter((product) => product.id !== action.product.id);
    case EDITED_CART:
      return state.map((product) => {
        if (product.id === action.product.id) return action.product;
        return product;
      });
    default:
      return state;
  }
}
