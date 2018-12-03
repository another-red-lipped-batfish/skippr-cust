import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  user: store.user,
  restaurant: store.restaurant,
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(actions.getRestaurants());
  }
});



const styles = StyleSheet.create({
  scroll: {
    marginTop: 10,
  },
  userName: {
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 20
  }
});

class Main extends React.Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    console.log('called');
    this.props.onLoad();
  }

  render() {
    console.log('New: ', this.props.restaurant);
    const restaurantList = [];
    this.props.restaurant.list.forEach((element, i) => {
      restaurantList.push(<Text key={i}>{element['rest_name']}</Text>);
    })
    return (
    <ScrollView style={styles.scroll}>
      <Text style={styles.userName}>Welcome {this.props.user.firstName}!</Text>
      {restaurantList}
    </ScrollView>
   )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
