import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

// Import children Components
import Navigator from './components/Navigator';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator/>
      </Provider>
    );
  }
};
