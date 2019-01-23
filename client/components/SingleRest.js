import React from 'react';
import { PropTypes } from 'prop-types';
import {
  ScrollView, TouchableHighlight, View,
  Image, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Toast from 'react-native-whc-toast';
import Swiper from 'react-native-swiper';
import SkipprBasket from './SkipprBasket';

const mapStateToProps = store => ({
  menu: store.menu.menu,
  order: store.order,
  menuLoaded: store.menu.menuLoaded,
  userLogIn: store.user.logged,
});

const mapDispatchToProps = dispatch => ({
  onLoad: (rest_id) => {
    dispatch(actions.getMenu(rest_id));
  },
  setOrder: (key) => {
    // console.log('setting order');
    dispatch(actions.setOrder(key));
  },
  submitOrder: (state) => {
    dispatch(actions.submitOrder(state));
  },
  deleteOrder: (key) => {
    console.log('deleting order');
    dispatch(actions.deleteOrder(key));
  }
});

const styles = StyleSheet.create({
  button: {
    borderRadius: 3,
    backgroundColor: 'lightblue',
    borderColor: 'lightblue',
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
    marginTop: 120,
    width: '100%',
  },
  restaurant: {
    fontSize: 15,
    paddingBottom: 3,
    marginLeft: '10%'
  },
  restaurantTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: '2%'
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
  hyperlink: {
    fontSize: 13,
    color: '#0000FF',
  },
});

class SingleRest extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { onLoad, restaurant, userLogIn } = this.props;
    if (userLogIn) onLoad(restaurant.rest_id);
  }

  // componentDidUpdate() {
  //   const { userLogIn, navigator } = this.props;
  //   if (!userLogIn) navigator.goBack(null);
  // }

  renderSubmitOrder() {
    const { menuLoaded, menu } = this.props;

    // console.log(`menuLoaded: ${menuLoaded} / Menu: ${menu}`);
    if (menuLoaded && menu.length > 0) {
      return (<TouchableOpacity 
                style={{marginBottom: 50, marginTop: 20,
                borderRadius: 10,
                backgroundColor: '#007bff',
                borderColor: '#007bff',
                borderWidth: 3,
                padding: 5,
                width: '90%',
                alignItems: 'center',
                justifyContent: 'center',}}
                onPress={() => submitOrder(order)}
              >
                <Text style={{fontStyle: 'bold', color: 'white', fontSize: 20}}>Submit Order</Text>
             </TouchableOpacity>);
    } else {
      return null;
    }
  }

  render() {
    // console.log('Attempting to Render SingleRest');
    const menuList = [];
    const {
      restaurant, order, submitOrder, userLogIn,
      menu, navigator, setOrder, menuLoaded, deleteOrder
    } = this.props;
    
    /* Line below is controversial as it takes
     * away the pure functionality of render.
     * however after extensive research unable to
     * determin alternate solution
     */
    if (!userLogIn) navigator.popToTop();
    /*******************************************/

    if (restaurant && menuLoaded && menu) {
      let colorSwitch = false;
      menu.forEach((el) => {
        menuList.push(
          <View key={`v2_${el.menu_item_id}`} style={{ width: '90%', height: 160, justifyContent: 'top'}}>
            <View key={`v1_${el.menu_item_id}`} style={{paddingBottom: 10, borderRadius: 3.5, textAlign: 'center', borderColor: 'lightblue', borderWidth: 1,}}>
              <Text key={`min_${el.menu_item_id}`} style={{fontStyle: 'italic', fontSize: 18, marginLeft: '1%', marginTop: 10}}>
                {el.menu_item_name}
              </Text>
              <Text key={`mip_${el.menu_item_id}`} style={{fontStyle: 'italic', fontSize: 15, marginLeft: '1%'}}>
                {el.menu_item_price}
              </Text>
              <Text key={`mid_${el.menu_item_id}`} style={{fontStyle: 'italic', fontSize: 12, marginLeft: '1%'}}>
                {el.menu_item_desc}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.refs.toast.show('Added ' + el.menu_item_name + '!', Toast.Duration.short, Toast.Position.center);
                return setOrder(el.menu_item_id);
              }}>
              <Text key={`ato_${el.menu_item_id}`} style={{color: 'white', fontSize: 18}}>Add to Order</Text>
            </TouchableOpacity>
          </View>,
        );
      });
      return (
        <Swiper 
        loop={false}
        showPagination={false}
        index={0}>
          <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableHighlight style={{ marginTop: 10, width: '99%', alignItems: 'flex-start' }} onPress={() => navigator.pop()}>
              <Text style={{ 
                textAlign: 'left',
                fontSize: 18.5,
                color: '#1E90FF',
                fontWeight: 'bold'
              }}> &#10094; &nbsp; Go Back</Text>
            </TouchableHighlight>
            <View style={styles.restaurantView}>
              <Text style={styles.restaurantTitle}>{restaurant.rest_name}</Text>
            </View>
            <ScrollView 
              style={{ height: '70%', width: '100%', marginLeft: '15%' }}
            >
              <Image
                style={{ width: 300, height: 100, borderRadius: 10, marginLeft: '1.5%' }}
                source={{ uri: restaurant.rest_imagelink }}
              />
              <Text style={styles.restaurant}>{restaurant.rest_address} {`${restaurant.rest_city}, ${restaurant.rest_state} ${restaurant.rest_zipcode}`}</Text>
              <Text style={styles.restaurant}>Phone #: {restaurant.rest_phone} | Email: {restaurant.rest_email}</Text>
              <Hyperlink linkDefault={ true } style={{marginBottom: 30}}>
                <Text style={styles.hyperlink}>
                  {restaurant.rest_yelp_link}
                </Text>
              </Hyperlink>
              {menuList}
            </ScrollView>
            <Text style={{ width: '100%', fontSize: 18, textAlign: 'center', marginTop: 24, color: 'gray', fontStyle: 'italic' }}>&nbsp;Swipe to see Order Details&nbsp;&#10095;</Text>
            <Toast ref='toast' style={{ backgroundColor: '#005A9C', padding: 20 }} opacity={0.85} />
          </View>
          <View>
            <SkipprBasket navigator={navigator} submitOrder={submitOrder} menuLoaded={menuLoaded} order={order} menu={menu} deleteOrder={deleteOrder}/>
          </View>
        </Swiper>
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
