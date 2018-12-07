// import actionType constants
import * as types from '../constants/actionTypes';

export const logEmail = text => ({
  type: types.LOG_EMAIL,
  payload: text,
});

export const logPass = text => ({
  type: types.LOG_PASSWORD,
  payload: text,
});

export const logIn = (state) => {
  return (dispatch) => {
    fetch('https://infinite-waters-83473.herokuapp.com/user/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email: state.emailField,
        password: state.passwordField,
      }),
    })
      .then(res => res.json())
      .then((user) => {
        dispatch({
          type: types.LOG_IN,
          payload: user,
        });
      });
  };
};

export const getRestaurants = () => {
  return (dispatch) => {
    fetch('https://infinite-waters-83473.herokuapp.com/user/restaurants')
      .then(res => res.json())
      .then((restaurants) => {
        dispatch({
          type: types.GET_RESTAURANTS,
          payload: restaurants,
        });
      });
  };
};

export const getMenu = (rest_id) => {
  console.log(`Restaurant ID: ${rest_id}`);
  return (dispatch) => {
    fetch(`https://infinite-waters-83473.herokuapp.com/user/restaurants/${rest_id}`)
      .then(res => res.json())
      .then((menu) => {
        console.log(menu);
        dispatch({
          type: types.GET_MENU,
          payload: menu,
        });
      });
  };
};

export const setOrder = key => ({
  type: types.SET_ORDER,
  payload: key,
});

export const resetMessage = () => ({
  type: types.RESET_MESSAGE
});

export const deleteOrder = key => ({
  type: types.DELETE_ORDER,
  payload: key,
});

export const submitOrder = (state) => {
  console.log('before submitting order');
  return (dispatch) => {
    fetch('https://infinite-waters-83473.herokuapp.com/user/order', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        userId: 1,
        restId: 1,
        menuItems: state.menuItems,
      }),
    })
      .then(res => res.json())
      .then((order) => {
        dispatch({
          type: types.SUBMIT_ORDER,
          payload: order,
        });
      });
  };
};
