import * as types from '../constants/actionTypes';

const initialState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
  emailField: '',
  passwordField: '',
  logged: false
};

const userReducer = (state=initialState, action) => {

  let id;
  let firstName;
  let lastName;
  let email;
  let phone;
  let emailField;
  let passwordField;
  let logged;

  switch(action.type) {

    case types.LOG_EMAIL:
      emailField = action.payload;
      console.log('CHANGING STATEEEEEEEE')
      return {
        ...state,
        emailField,
      };

    case types.LOG_PASSWORD:
      passwordField = action.payload;

      return {
        ...state,
        passwordField,
      };
    
    case types.LOG_IN:
      const { user_id, user_firstname, user_lastname, user_email, user_phone} = action.payload;

      id = user_id;
      firstName = user_firstname;
      lastName = user_lastname;
      email = user_email;
      phone = user_phone;
      emailField = '';
      passwordField = '';
      logged = true;
      return {
        ...state,
        id,
        firstName,
        lastName,
        email,
        phone,
        emailField,
        passwordField,
        logged,
      };

    default:
      return state;
  }
};

export default userReducer;
