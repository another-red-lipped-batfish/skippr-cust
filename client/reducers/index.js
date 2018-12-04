import { combineReducers } from 'redux';

// import all reducers here
import usersReducer from './usersReducer';
import restaurantsReducer from './restaurantsReducer';
import ordersReducer from './ordersReducer';
import menusReducer from './menusReducer';


// combine reducers
const reducers = combineReducers({
  // if we had other reducers, they would go here
  user: usersReducer,
  restaurant: restaurantsReducer,
  order: ordersReducer,
  menu: menusReducer,
});

// make the combined reducers available for import
export default reducers;
