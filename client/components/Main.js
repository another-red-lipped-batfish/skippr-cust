import React from 'react';
import { ScrollView, View, Image, Text, Button, StyleSheet, NavigatorIOS, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import SingleRest from './SingleRest';

const mapStateToProps = store => ({
  user: store.user,
  restaurant: store.restaurant.list,
  loaded: store.restaurant.loaded
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(actions.getRestaurants());
    // dispatch(actions.getMenu());
  },
  setOrder: (key) => {
    console.log('setting order');
    dispatch(actions.setOrder(key));
  },
  submitOrder: (state) => {
    dispatch(actions.submitOrder(state));
  }
});

const styles = StyleSheet.create({
  singleRest: {
    borderWidth: 1.5,
    borderColor: 'lightblue',
    borderRadius: 10,
    width: 350,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  restName: {
    fontWeight: 'bold',
    fontSize: 20
  },
  scroll: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 20,
  },
  userName: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 5,
    marginTop: 0
  },
  list: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 18.5,
    marginBottom: 20,
  }
});

class Main extends React.Component {
  constructor(props) {
    super(props);
  };

  componentWillMount() {
    this.props.onLoad();
  }

  handleClickedRestaurant(restObj) {
    const nextRoute = {
      component: SingleRest,
      title: 'Single Restaurant Display',
      passProps: {restaurant: restObj}
    };
    this.props.navigator.push(nextRoute);
  } 

  render() {
    
    if (!this.props.loaded) return null;
    else {

      const restaurantList = [];
      this.props.restaurant.forEach((element, i) => {
        restaurantList.push(
          <TouchableOpacity key={i} style={styles.singleRest} onPress={() => this.handleClickedRestaurant(element)}>
            <Image style={{ width: 300, height: 50, borderWidth: 1, borderRadius: 10 }} source={{ uri: element['rest_imagelink'] }} />
            <Text style={styles.restName}>
            {element['rest_name']}
            </Text>
          </TouchableOpacity>
        );
      });
      return (
        <ScrollView style={styles.scroll}>
          <Text style={styles.userName}>Welcome, {this.props.user.firstName}!</Text>
          <Text style={styles.list}>Please choose a coffee shop to start:</Text>
          {restaurantList}
        </ScrollView>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);