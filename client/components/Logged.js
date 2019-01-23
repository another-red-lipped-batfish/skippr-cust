import React from 'react';
// import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { NavigatorIOS } from 'react-native';
import Login from '../components/Login';
import Main from '../components/Main';

const mapStateToProps = store => ({
  user: store.user,
});

const mapDispatchToProps = dispatch => ({
  
});

function Logged(props) {
  const checkLog = props.user.logged;
  const { navigator } = props;
  if (!checkLog) {
    return <Login navigator={navigator}/>;
  }
  return <Main navigator={navigator} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(Logged);
