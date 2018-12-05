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
    dispatch(actions.getMenu());
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
    borderWidth: 3,
    borderColor: 'lightblue',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  restName: {
    fontWeight: 'bold',
    fontSize: 20
  },
  scroll: {
    borderColor: 'lightgray',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 20
  },
  userName: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
  },
  menu: {
    marginTop: 25
  },
  menottis: {
    fontSize: 15
  },
  menottisTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  menottisView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25
  },
  menuItemTitle: {
    fontWeight: 'bold'
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
            <Text style={styles.restName}>
              {element['rest_name']}
            </Text>
          </TouchableOpacity>
        );
      });
      return (
        <ScrollView style={styles.scroll}>
          <Text style={styles.userName}>Welcome, {this.props.user.firstName}!</Text>
          {restaurantList}
        </ScrollView>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);