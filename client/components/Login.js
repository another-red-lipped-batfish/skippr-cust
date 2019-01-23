import React from 'react';
import {
  View, TextInput, Text,
  StyleSheet, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  user: store.user,
});

const mapDispatchToProps = dispatch => ({
  logemail: (text) => {
    dispatch(actions.logEmail(text));
  },
  logpass: (text) => {
    dispatch(actions.logPass(text));
  },
  login: (event) => {
    dispatch(actions.logIn(event));
  },
});

const styles = StyleSheet.create({
  form: {
    height: 50,
    fontSize: 20,
    borderColor: 'lightgray',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 15,
    paddingLeft: 60,
    paddingRight: 60,
  },
  formTitle: {
    fontSize: 20,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 18,
  },
  formBox: {
    marginTop: 10,
    padding: 10,
  },
  button: {
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    borderWidth: 3,
    padding: 5,
  },
  login: {
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 27,
  },
  error: {
    color: 'red',
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const Login = (props) => {
  return (
    <View style={styles.formBox}>
      <Text style={styles.formTitle}>But first, log in!</Text>
      <TextInput autoCapitalize='none' onChangeText={props.logemail} placeholder="Email please!" style={styles.form} type="text">{props.user.emailField}</TextInput>
      <TextInput autoCapitalize='none' onChangeText={props.logpass} placeholder="Password please!" style={styles.form} type="text" secureTextEntry={true}>{props.user.passwordField}</TextInput>
      <TouchableOpacity style={styles.button} onPress={() => { props.login(props.user); }}>
        <Text style={styles.login}>Log In</Text>
      </TouchableOpacity>
      <Text style={styles.error} >{props.user.loginErrorMsg}</Text>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
