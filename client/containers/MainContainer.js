import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// import from child components...
import Logged from '../components/Logged';

export default class MainContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.subtitle}>Ready to skip the line to your favorite shop?!</Text>
        <Logged navigator={this.props.navigator}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
