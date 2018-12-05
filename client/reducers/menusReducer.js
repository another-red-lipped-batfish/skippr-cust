import * as types from '../constants/actionTypes';

const initialState = {
  menu: [],
};

const menusReducer = (state = initialState, action) => {
  let menu;
  switch (action.type) {
    case types.GET_MENU:
      menu = action.payload;
      return {
        ...state,
        menu,
      };

    default:
      return state;
  }
};

export default menusReducer;
