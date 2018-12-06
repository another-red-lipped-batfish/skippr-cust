import * as types from '../constants/actionTypes';

const initialState = {
  menu: [],
  menuLoaded: false,
};

const menusReducer = (state = initialState, action) => {
  let menu;
  switch (action.type) {
    case types.GET_MENU:
      menu = action.payload;
      menuLoaded = true;
      return {
        ...state,
        menu,
        menuLoaded,
      };

    default:
      return state;
  }
};

export default menusReducer;
