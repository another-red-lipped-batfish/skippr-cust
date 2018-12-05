import * as types from '../constants/actionTypes';

const initialState = {
  list: [],
  search: '',
  loaded: false,
};

const restaurantReducer = (state=initialState, action) => {
  let list;
  switch(action.type) {

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
