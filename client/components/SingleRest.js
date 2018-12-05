import { React } from 'react';
import { PropTypes } from 'prop-types';
import {
  ScrollView, TouchableHighlight, View, Image, Text, Button, StyleSheet,
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

class SingleRest extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { onLoad, restaurant } = this.props;
    onLoad(restaurant.rest_id);
  }

  render() {
    const menuList = [];
    const {
      restaurant, order, submitOrder,
      menu, navigator, setOrder,
    } = this.props;

    if (restaurant && menu) {
      // console.log('list is ', this.props.restaurant);
      menu.forEach((el, index) => {
        menuList.push(<Text style={styles.menuItemTitle}>{el.menu_item_name}</Text>, <Text>{el.menu_item_price}</Text>, <Text>{el.menu_item_desc}</Text>, <Button key={index + 1} onPress={() => setOrder(index + 1)} title="Add to Order" />);
      });
      return (
        <View>
          <TouchableHighlight onPress={() => navigator.pop()}>
            <Text>Go Back</Text>
          </TouchableHighlight>
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
        </View>

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

SingleRest.propTypes = {
  onLoad: PropTypes.func.isRequired,
  submitOrder: PropTypes.func.isRequired,
  setOrder: PropTypes.func.isRequired,
  restaurant: PropTypes.instanceOf(Object).isRequired,
  order: PropTypes.instanceOf(Object),
  menu: PropTypes.instanceOf(Array).isRequired,
  navigator: PropTypes.element.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleRest);
