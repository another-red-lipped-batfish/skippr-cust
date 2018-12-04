import * as types from '../constants/actionTypes';

const initialState = {
  menuItems: [],
  userId: 1,
  restId: 1,
  message: null,
};

const orderReducer = (state=initialState, action) => {
  // let menuItems = state.menuItems;
  let menuItems;
  const itemsPicked = [];
  let message;
  switch(action.type) {
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
      }
    default:
      return state;
  }
};

export default orderReducer;
