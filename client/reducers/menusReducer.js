import * as types from '../constants/actionTypes';

const initialState = {
  menu: [],
};

const menusReducer = (state=initialState, action) => {
  let menu;
  switch(action.type) {

    case types.GET_MENU:
      // console.log('payload is ', action.payload[0]);
      menu = action.payload;
      // console.log('list is ', list)
      return {
        ...state,
        menu,
      };
      
    default:
      return state;
  }
};

export default menusReducer;
