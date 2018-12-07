import * as types from '../constants/actionTypes';

const initialState = {
  menuItems: [],
  restId: null,
  message: null,
  cart: [],
};

const orderReducer = (state = initialState, action) => {
  // let menuItems = state.menuItems;
  let menuItems = [];
  const itemsPicked = [];
  let message = null;
  let cart = [];
  let restId = null;

  switch (action.type) {
    case types.LOG_OUT:
      return {
        ...state,
        menuItems,
        restId,
        message,
        cart,
      };
      
    case types.SET_ORDER:
      console.log('pushing ', action.payload);
      itemsPicked.push(action.payload);
      console.log('menu items are ', itemsPicked);
      menuItems = state.menuItems.concat(itemsPicked);
      console.log(menuItems);
      return {
        ...state,
        menuItems,
      };
    case types.SUBMIT_ORDER:
      message = action.payload.message;
      menuItems = [];
      return {
        ...state,
        message,
        menuItems,
      };
    default:
      return state;
  }
};

export default orderReducer;
