import React from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  user: store.user
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
  }
});

const styles = StyleSheet.create({
  form: {
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
      <TextInput onChangeText={props.logemail} placeholder="Email please!" style={styles.form} type="text" />
      <TextInput onChangeText={props.logpass} placeholder="Password please!" style={styles.form} type="text" secureTextEntry={true} />
      {/* <Button onPress={props.login} title="Log in!" color="lightblue" /> */}
      <Button onPress={() => { props.login(props.user); }} title="Log in!" color="lightblue" />
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
