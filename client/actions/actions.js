// import actionType constants
import * as types from '../constants/actionTypes';

const parseJSON = response => new Promise((resolve) => {
  response.json()
    .then((json) => {
      resolve({
        status: response.status,
        ok: response.ok,
        json,
      });
    });
});

export const logEmail = text => ({
  type: types.LOG_EMAIL,
  payload: text,
});

export const logPass = text => ({
  type: types.LOG_PASSWORD,
  payload: text,
});

export const logOut = () => ({
  type: types.LOG_OUT,
});

export const logIn = (state) => {
  return (dispatch) => {
    let statusCode = null;
    let errorText = null;
    let user = null;

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
      .then(parseJSON)
      .then((res) => {
        statusCode = res.status;
        // a non 200-299 range status code
        // unable to retrieve the error message
        // we sent from server
        if (!res.ok) errorText = res.json || '';
        else user = res.json;
        dispatch({
          type: types.LOG_IN,
          payload: {
            statusCode,
            user,
            errorText,
          },
        });
      })
      .catch((err) => {
        throw new Error(err);
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
