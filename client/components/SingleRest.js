import React from 'react';
import { PropTypes } from 'prop-types';
import {
  ScrollView, TouchableHighlight, View,
  Image, Text, Button, StyleSheet, TouchableOpacity,
} from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';


const mapStateToProps = store => ({
  menu: store.menu.menu,
  order: store.order,
  menuLoaded: store.menu.menuLoaded,
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
  button: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    borderWidth: 3,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    width: '100%',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemSeperator1: {
    backgroundColor: '#ADD8E6',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemSeperator2: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hyperlink: {
    fontSize: 20,
    color: '#0000FF',
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

  renderSubmitOrder() {
    const { menuLoaded, menu } = this.props;

    console.log(`menuLoaded: ${menuLoaded} / Menu: ${menu}`);
    if (menuLoaded && menu.length > 0) {
      return (<TouchableOpacity 
                style={styles.button}
                onPress={() => submitOrder(order)}
              >
                <Text>Submit Order</Text>
             </TouchableOpacity>);
    } else {
      return null;
    }
  }

  render() {
    console.log('Attempting to Render SingleRest');
    const menuList = [];
    const {
      restaurant, order, submitOrder,
      menu, navigator, setOrder, menuLoaded,
    } = this.props;

    if (restaurant && menuLoaded && menu) {
      let colorSwitch = false;
      let curStyle = styles.menuItemSeperator1;
      menu.forEach((el, index) => {
        menuList.push(
          <View
            key={`TitleView${el.menu_item_id}`}
            style={curStyle}
          >
            <Text
              key={`menuItemTitle${el.menu_item_id}`}
              style={styles.menuItemTitle}
            >
              {el.menu_item_name}
            </Text>
          </View>,
        );

        menuList.push(
          <View
            key={`PriceView${el.menu_item_id}`}
            style={curStyle}
          >
            <Text
              key={`menuItemPrice${el.menu_item_id}`}
            >
              {el.menu_item_price}
            </Text>
          </View>,
        );
        menuList.push(
          <View
            key={`DescView${el.menu_item_id}`}
            style={curStyle}
          >
            <Text
              key={`menuItemDesc${el.menu_item_id}`}
              style={`${colorSwitch ? styles.menuItemSeperator1 : styles.menuItemSeperator2}`}
            >
              {el.menu_item_desc}
            </Text>
          </View>,
        );
        menuList.push(
          <View
            key={`ButtonView${el.menu_item_id}`}
            style={curStyle}
          >
            <TouchableOpacity
              style={styles.button}
              key={el.menu_item_id}
              onPress={() => setOrder(index + 1)}
            >
              <Text>Add to Order</Text>
            </TouchableOpacity>
          </View>,
        );

        if (!colorSwitch) {
          curStyle = styles.menuItemSeperator2;
          colorSwitch = true;
        } else {
          curStyle = styles.menuItemSeperator1;
          colorSwitch = false;
        }
      });
      return (
        <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableHighlight onPress={() => navigator.pop()}>
            <Text>Go Back</Text>
          </TouchableHighlight>
          <ScrollView>
            <View style={styles.restaurantView}>
              <Text style={styles.restaurantTitle}>{restaurant.rest_name}</Text>
              <Image
                style={{ width: 300, height: 250 }}
                source={{ uri: restaurant.rest_imagelink }}
              />
              <Text style={styles.restaurant}>{restaurant.rest_address}</Text>
              <Text style={styles.restaurant}>{`${restaurant.rest_city}, ${restaurant.rest_state} ${restaurant.rest_zipcode}`}</Text>
              <Text style={styles.restaurant}>{restaurant.rest_phone}</Text>
              <Text style={styles.restaurant}>{restaurant.rest_email}</Text>
              <Hyperlink linkDefault={ true }>
                <Text style={styles.hyperlink}>
                  {restaurant.rest_yelp_link}
                </Text>
              </Hyperlink>
            </View>
            <View style={styles.menu}>
              {menuList}
            </View>
            <View style={styles.menu}>
              {this.renderSubmitOrder()}
            </View>
          </ScrollView>
        </View>

      );
    } else return null;
  }
}

SingleRest.propTypes = {
  onLoad: PropTypes.func.isRequired,
  submitOrder: PropTypes.func.isRequired,
  setOrder: PropTypes.func.isRequired,
  restaurant: PropTypes.instanceOf(Object).isRequired,
  order: PropTypes.instanceOf(Object),
  menu: PropTypes.instanceOf(Object).isRequired,
  navigator: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleRest);
