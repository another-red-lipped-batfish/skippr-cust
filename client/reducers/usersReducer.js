import * as types from '../constants/actionTypes';

const initialState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
  emailField: '',
  passwordField: '',
  loginErrorMsg: '',
  logged: false,
};

const userReducer = (state = initialState, action) => {
  let id = null;
  let firstName = null;
  let lastName = null;
  let email = null;
  let phone = null;
  let emailField = '';
  let passwordField = '';
  let loginErrorMsg = '';
  let logged = false;

  switch (action.type) {
    case types.LOG_EMAIL:
      emailField = action.payload;
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

    case types.LOG_OUT:
      return {
        ...state,
        id,
        firstName,
        lastName,
        email,
        phone,
        emailField,
        passwordField,
        loginErrorMsg,
        logged,
      };

    case types.LOG_IN:
      // Determine if Login was successful
      if (action.payload.statusCode >= 200 && action.payload.statusCode <= 299) {
        // Success has status in the range 200-299
        const { 
          user_id, user_firstname, user_lastname,
          user_email, user_phone
        } = action.payload.user;

        logged = true;
        loginErrorMsg = '';
        emailField = '';
        passwordField = '';
        id = user_id;
        firstName = user_firstname;
        lastName = user_lastname;
        email = user_email;
        phone = user_phone;
      } else if (action.payload.statusCode >= 400 && action.payload.statusCode <= 499) {
        logged = false;
        loginErrorMsg = `Failed to Login - (Code: ${action.payload.statusCode})`;
      } else {
        logged = false;
        loginErrorMsg = `Failed to Login: ${action.payload.errorText || ''} (Code: ${action.payload.statusCode})`;
      }

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
        loginErrorMsg,
      };

    default:
      return state;
  }
};

export default userReducer;
