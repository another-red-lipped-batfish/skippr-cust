import React from 'react';
import { StyleSheet, Text, View, NavigatorIOS } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import Navigator from './components/Navigator'

import MainContainer from './containers/MainContainer';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Text style={titleStyle.container}>Skippr</Text>
          <Navigator/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
});

const titleStyle = StyleSheet.create({
  container: {
    fontSize: 75,
    fontWeight: 'bold',
  }
})
