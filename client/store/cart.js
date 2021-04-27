import axios from "axios";
import { clearGuestCart } from "./guestCart";

const GOT_ALL_CART_PRODUCTS = "GOT_ALL_CART_PRODUCTS";
const DELETED_FROM_CART = "DELETED_FROM_CART";
const EDITED_CART = "EDITED_CART";
const ADDED_PRODUCT = "ADDED_PRODUCT";
const SUBMITED_ORDER = "SUBMITTED_ORDER";
const LOAD_ORDERS = "LOAD_ORDERS";

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

const _editCart = (productOrder) => ({
	type: EDITED_CART,
	productOrder,
});

const _submitOrder = (order) => ({
	type: SUBMITED_ORDER,
	order,
});

const _fetchOrders = (orders) => ({
	type: LOAD_ORDERS,
	orders,
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

export const submitOrder = (userId, orderId) => {
	return async (dispatch) => {
		const { data: order } = await axios.put(
			`/api/users/${userId}/orders/${orderId}`,
			{
				isPaid: true,
			}
		);
		dispatch(_submitOrder(order));
	};
};

export const editCart = (userId, productId, quantity) => {
	return async (dispatch) => {
		const { data: updated } = await axios.put(`/api/users/${userId}/cart`, {
			productId: productId,
			quantity: quantity,
		});
		dispatch(_editCart(updated));
	};
};

export const combinedCarts = (userId) => {
	return async (dispatch) => {
		const productIds = Object.keys(localStorage).filter(
			(num) => isNaN(num) === false
		);
		const quantities = Object.values(localStorage).filter(
			(num) => isNaN(num) === false
		);

		const { data } = await axios.put(`/api/users/${userId}/cart/join`, {
			productIds,
			quantities,
		});

		dispatch(setProducts(data));
		dispatch(clearGuestCart(productIds));
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
			return state.map((productOrder) => {
				if (productOrder.productId === action.productOrder.productId)
					return action.productOrder;
				return productOrder;
			});
		case SUBMITED_ORDER:
			return initialState;
		default:
			return state;
	}
}
