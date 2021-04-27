import axios from "axios";

const GOT_ALL_GUEST_CART_PRODUCTS = "GOT_ALL_GUEST_CART_PRODUCTS";
const CLEAR_GUEST_CART = "CLEAR_GUEST_CART";

const setGuestProducts = (products) => ({
	type: GOT_ALL_GUEST_CART_PRODUCTS,
	products,
});

const _clearGuestCart = () => {
	return {
		type: CLEAR_GUEST_CART,
	};
};

export const fetchGuestCart = (guestProducts) => {
	return async (dispatch) => {
		try {
			const response = await axios.put(`/api/cart`, { guestProducts });
			const guestCart = response.data;
			dispatch(setGuestProducts(guestCart));
		} catch (error) {
			console.log(error);
		}
	};
};

export const clearGuestCart = (productIds) => {
	return (dispatch) => {
		try {
			for (let i = 0; i < productIds.length; i++) {
				localStorage.removeItem(productIds[i]);
			}
			dispatch(_clearGuestCart());
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
		case CLEAR_GUEST_CART:
			return state;
		default:
			return state;
	}
}
