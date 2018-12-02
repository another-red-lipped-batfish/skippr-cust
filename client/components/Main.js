import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  
});

const mapDispatchToProps = dispatch => ({
  
});

const styles = StyleSheet.create({
  scroll: {
    marginTop: 10
  }
});

const Main = (props) => {
  return (
    <ScrollView style={styles.scroll}>
      <Text>Hello1</Text>
      <Text>Hello2</Text>
      <Text>Hello3</Text>
    </ScrollView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
