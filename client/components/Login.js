import React from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  
});

const mapDispatchToProps = dispatch => ({
  login: (event) => {
    dispatch(actions.logIn(event));
  }
});

const styles = StyleSheet.create({
  form: {
    // borderColor: 'gray',
    // borderWidth: 1,
    height: 50,
    fontSize: 20
  },
  formTitle: {
    fontSize: 20,
    textDecorationLine: 'underline'
  },
  formBox: {
    marginTop: 10,
    padding: 10
  }
});

const Login = (props) => {
  return (
    <View style={styles.formBox}>
      <Text style={styles.formTitle}>But first, log in!</Text>
      <TextInput placeholder="Email please!" style={styles.form} />
      <TextInput placeholder="Password please!" style={styles.form} />
      <Button onPress={props.login} title="Log in!" color="lightblue" />
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
