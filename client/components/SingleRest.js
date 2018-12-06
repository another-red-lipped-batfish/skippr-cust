import React from 'react';
import { PropTypes } from 'prop-types';
import {
  ScrollView, TouchableHighlight, View,
  Image, Text, Button, StyleSheet, TouchableOpacity,
} from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Toast from 'react-native-whc-toast';


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
    const { onLoad, restaurant } = this.props;
    onLoad(restaurant.rest_id);
  }

  renderSubmitOrder() {
    const { menuLoaded, menu } = this.props;

    console.log(`menuLoaded: ${menuLoaded} / Menu: ${menu}`);
    if (menuLoaded && menu.length > 0) {
      return (<TouchableOpacity 
                style={{marginBottom: 50, marginTop: 20,
                borderRadius: 10,
                backgroundColor: '#007bff',
                borderColor: '#007bff',
                borderWidth: 3,
                fontStyle: 'bold',
                padding: 5,
                width: '90%',
                alignItems: 'center',
                justifyContent: 'center',}}
                onPress={() => submitOrder(order)}
              >
                <Text style={{color: 'white', fontSize: 20}}>Submit Order</Text>
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
      menu.forEach((el, index) => {
        menuList.push(
          <View style={{ width: '90%', height: 160, justifyContent: 'top'}}>
            <View style={{paddingBottom: 10, borderRadius: 3.5, textAlign: 'center', borderColor: 'lightblue', borderWidth: 1,}}>
              <Text style={{fontStyle: 'bold', fontSize: 18, marginLeft: '1%', marginTop: 10}}>
                {el.menu_item_name}
              </Text>
              <Text style={{fontStyle: 'bold', fontSize: 15, marginLeft: '1%'}}>
                {el.menu_item_price}
              </Text>
              <Text style={{fontStyle: 'bold', ontSize: 12, marginLeft: '1%'}}>
                {el.menu_item_desc}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.refs.toast.show('Added ' + el.menu_item_name + '!', Toast.Duration.long, Toast.Position.center);
                return setOrder(index + 1);
              }}>
              <Text style={{color: 'white', fontSize: 18}}>Add to Order</Text>
            </TouchableOpacity>
          </View>,
        );
      });
      return (
        <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableHighlight style={{ marginTop: 10, width: '99%', alignItems: 'left' }} onPress={() => navigator.pop()}>
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
            style={{ height: '80%', width: '100%', marginLeft: '15%' }}
          >
            <Image
              style={{ width: 300, height: 100, borderRadius: 10, borderBottom: 20, marginLeft: '1.5%' }}
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
            {this.renderSubmitOrder()}
         </ScrollView>
         <Toast ref='toast' style={{ backgroundColor: '#005A9C', padding: 20, fontSize: 100 }} opacity={0.85} fadeInDuration = {50} fadeOutDuration = {50}/>
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
