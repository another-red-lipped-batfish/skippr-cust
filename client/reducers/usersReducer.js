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
      // fetch('http://192.168.86.234:3000/user/login', {
      //   method: 'POST',
      //   mode: 'cors',
      //   headers: {
      //     'Content-Type': 'application/json; charset=utf-8',
      //     'Access-Control-Allow-Origin': '*',
      //   },
      //   body: JSON.stringify({
      //     email: state.emailField,
      //     password: state.passwordField,
      //   }),
      // })
      //   .then(res => res.json())
      //   .then((data) => {
      //     id = data['user_id'];
      //     firstName = data['user_firstname'];
      //     lastName = data['user_lastname'];
      //     email = data['user_email'];
      //     phone = data['user_phone'];
      //     emailField = '';
      //     passwordField = '';
      //     logged = true;
      //     // console.log(state);
      //     return {
      //       ...state,
      //       // id,
      //       // firstName,
      //       // lastName,
      //       // email,
      //       // phone,
      //       // emailField,
      //       // passwordField,
      //       logged,
      //     };
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

    default:
      return state;
  }
};

export default userReducer;
