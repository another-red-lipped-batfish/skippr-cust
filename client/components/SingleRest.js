import React from 'react';
import {
  ScrollView, View, Image, Text, Button, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  menu: store.menu.menu,
  order: store.order,
});

const mapDispatchToProps = dispatch => ({
  onLoad: (rest_id) => {
    dispatch(actions.getMenu(rest_id));
  },
  setOrder: (key) => {
    console.log('setting order');
    dispatch(actions.setOrder(key));
  },
  submitOrder: (state) => {
    dispatch(actions.submitOrder(state));
  },
});

const styles = StyleSheet.create({
  scroll: {
    marginTop: 10,
  },
  userName: {
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  menu: {
    marginTop: 25,
  },
  restaurant: {
    fontSize: 15,
  },
  restaurantTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  restaurantView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  menuItemTitle: {
    fontWeight: 'bold',
  },
});

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    const { onLoad } = this.props;
    onLoad(this.props.restaurant.rest_id);
  }

  render() {
    const menuList = [];
    if (this.props.restaurant && this.props.menu) {
      // console.log('list is ', this.props.restaurant);
      const { restaurant, order, submitOrder } = this.props;
      this.props.menu.forEach((el, index) => {
        menuList.push(<Text style={styles.menuItemTitle}>{el.menu_item_name}</Text>, <Text>{el.menu_item_price}</Text>, <Text>{el.menu_item_desc}</Text>, <Button key={index + 1} onPress={() => this.props.setOrder(index + 1)} title="Add to Order" />);
      });
      return (
        <ScrollView>
          <View style={styles.restaurantView}>
            <Text style={styles.restaurantTitle}>{restaurant.rest_name}</Text>
            <Image style={{ width: 305, height: 212 }} source={{ uri: restaurant.rest_imagelink }} />
            <Text style={styles.restaurant}>{restaurant.rest_address}</Text>
            <Text style={styles.restaurant}>{`${restaurant.rest_city}, ${restaurant.rest_state} ${restaurant.rest_zipcode}`}</Text>
            <Text style={styles.restaurant}>{restaurant.rest_phone}</Text>
            <Text style={styles.restaurant}>{restaurant.rest_email}</Text>
            <Text style={styles.restaurant}>{restaurant.rest_yelp_link}</Text>
          </View>
          <View style={styles.menu}>
            {menuList}
            <Button onPress={() => submitOrder(order)} title="Submit Order" />
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View>
          <Text>Restaurant NA</Text>
        </View>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
