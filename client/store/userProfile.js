import axios from "axios";

const SET_USER = "SET_USER";
const PAST_ORDER = "PAST_ORDER";
const EDIT_USER = "EDIT_USER";
const TOKEN = "token";

export const setUser = (user) => ({
	type: SET_USER,
	user,
});

export const pastOrders = (pastOrder) => ({
	type: PAST_ORDER,
	pastOrder,
});

export const editUser = (user) => ({
	type: EDIT_USER,
	user,
});

export const fetchUserProfile = (id) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem(TOKEN);
			const response = await axios.get(`/api/users/${id}/profile`, {
				headers: { authorization: token },
			});
			const userInfo = response.data;
			dispatch(setUser(userInfo));
		} catch (error) {
			console.log(error);
		}
	};
};

export const fetchPastOrders = (id) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem(TOKEN);
			const response = await axios.get(`/api/users/${id}/orders`, {
				headers: { authorization: token },
			});
			const userPastOrders = response.data;
			// console.log('this is previous order --->', userPastOrders)
			dispatch(pastOrders(userPastOrders));
		} catch (error) {
			console.log(error);
		}
	};
};

export const updateUser = (user) => {
	return async (dispatch) => {
		try {
			const response = await axios.put(`/api/users/${user.id}`, user);
			const userUpdated = response.data;
			dispatch(editUser(userUpdated));
		} catch (error) {
			console.log(error);
		}
	};
};

const initialState = {
	user: {},
	pastOrder: [],
};

export default function UserProfileReducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.user };
		case PAST_ORDER:
			return { ...state, pastOrder: action.pastOrder };
		case EDIT_USER:
			return { ...state, user: action.user };
		default:
			return state;
	}
}
