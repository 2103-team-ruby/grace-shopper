import axios from "axios";

const GOT_ALL_CART_PRODUCTS = "GOT_ALL_CART_PRODUCTS";
const DELETED_FROM_CART = "DELETED_FROM_CART";
const EDITED_CART = "EDITED_CART";
const ADDED_PRODUCT = "ADDED_PRODUCT";

export const setProducts = (products) => ({
	type: GOT_ALL_CART_PRODUCTS,
	products,
});

const _addProduct = (productOrder) => {
	return {
		type: ADDED_PRODUCT,
		productOrder,
	};
};

const deletedProduct = (productId) => ({
	type: DELETED_FROM_CART,
	productId,
});

const editCart = (product) => ({
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

export const addToCart = (userId, productId) => {
	try {
		return async (dispatch) => {
			const { data: productOrder } = await axios.post(
				`/api/users/${userId}/cart`,
				{
					productId: productId,
				}
			);
			dispatch(_addProduct(productOrder));
		};
	} catch (error) {}
};

export const deleteProduct = (userId, productId) => {
	return async (dispatch) => {
		try {
			await axios.delete(`/api/users/${userId}/cart/${productId}`);
			dispatch(deletedProduct(productId));
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
		dispatch(editCart(updated));
	};
};

const initialState = [];

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case GOT_ALL_CART_PRODUCTS:
			return action.products;
		case ADDED_PRODUCT:
			return [...state, action.productOrder];
		case DELETED_FROM_CART:
			return state.filter(
				(productOrder) => productOrder.product.id !== action.productId
			);
		case EDITED_CART:
			return state.map((product) => {
				if (product.id === action.product.id) return action.product;
				return product;
			});
		default:
			return state;
	}
}
