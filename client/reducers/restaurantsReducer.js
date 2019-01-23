import * as types from '../constants/actionTypes';

const initialState = {
  list: [],
  search: '',
  loaded: false,
};

const restaurantReducer = (state=initialState, action) => {
  let list = [];
  let search = '';
  let loaded = false;
  switch(action.type) {

    case types.LOG_OUT:
      return {
        ...state,
        list,
        loaded,
        search,
      };

    case types.GET_RESTAURANTS:
      list = action.payload;
      loaded = true;
      return {
        ...state,
        list,
        loaded
      };
      
    default:
      return state;
  }
};

export default restaurantReducer;
