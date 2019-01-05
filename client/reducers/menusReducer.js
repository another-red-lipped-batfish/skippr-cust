import * as types from '../constants/actionTypes';

const initialState = {
  menu: [],
  menuLoaded: false,
};

const menusReducer = (state = initialState, action) => {
  let menu = [];
  let menuLoaded = false;

  switch (action.type) {
    case types.LOG_OUT:
      return {
        ...state,
        menu,
        menuLoaded,
      };

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
