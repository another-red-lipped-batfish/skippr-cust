import * as types from '../constants/actionTypes';

const initialState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  emailField: '',
  passwordField: '',
  logged: false
};

const userReducer = (state=initialState, action) => {
  switch(action.type) {

    case types.LOG_IN:
      let something = 'something';

      return {
        ...state,
      };
      
    default:
      return state;
  }
};

export default userReducer;
