import axios from "axios";

const SET_USER = "SET_USER";
const PAST_ORDER = "PAST_ORDER";


export const setUser = (user) => ({
    type: SET_USER,
    user,
  });

export const pastOrders = (pastOrder) => ({
    type: PAST_ORDER,
    pastOrder,
})
  

  export const fetchUserProfile = (id) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`/api/users/${id}/profile`
        );
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
              const response = await axios.get(`/api/users/${id}/orders`)
              const userPastOrders = response.data;
              console.log('this is previous order --->', userPastOrders)
              dispatch(pastOrders(userPastOrders))
          } catch (error) {
              console.log(error)
          }
      }
  }

  const initialState = {
      user: {},
      pastOrder: []
  };

  export default function UserProfileReducer(state = initialState, action) {
    switch (action.type) {
      case SET_USER:
        return {...state, user: action.user}
      case PAST_ORDER:
          return {...state, pastOrder: [...action.pastOrder]}
      default:
        return state;
    }
  }