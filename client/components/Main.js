import React from 'react';
import { ScrollView, View, Image, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  user: store.user,
  restaurant: store.restaurant.list,
  menu: store.menu.menu,
  order: store.order,
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
  scroll: {
    marginTop: 10,
  },
  userName: {
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 20
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

  componentDidMount() {
    // console.log('called');
    this.props.onLoad();
  }

  // render() {
  //   // console.log('New: ', this.props.restaurant);
  //   const restaurantList = [];
  //   this.props.restaurant.list.forEach((element, i) => {
  //     restaurantList.push(<Text key={i}>{element['rest_name']}</Text>);
  //   })
  //   return (
  //     <ScrollView style={styles.scroll}>
  //       <Text style={styles.userName}>Welcome {this.props.user.firstName}!</Text>
  //       {restaurantList}
  //       <Button onPress={this.props.orderCoffee} title="Submit Order" />
  //       <Text>Hello {this.props.order.message}</Text>
  //     </ScrollView>
  //   );
  // }

  render() {
    let Menottis;
    const menuList = [];
    if (this.props.restaurant && this.props.menu) {
      // console.log('list is ', this.props.restaurant);
      Menottis = this.props.restaurant;
      this.props.menu.forEach((el, index) => {
        menuList.push(<Text style={styles.menuItemTitle}>{el.menu_item_name}</Text>, <Text>{el.menu_item_price}</Text>, <Text>{el.menu_item_desc}</Text>, <Button key={index + 1} onPress={() => this.props.setOrder(index + 1)} title="Add to Order" />);
      });
      // console.log('Menottis is ', Menottis);
      return (
        <ScrollView>
          <View style={styles.menottisView}>
            <Text style={styles.menottisTitle}>Menottis</Text>
            <Image style={{ width: 305, height: 212 }} source={{ uri:"http://frshgrnd.com/wp-content/uploads/2015/10/menottis-coffee-shop-venice-FRSHGRND-1898-610x424.jpg" }} />
            <Text style={styles.menottis}>56 Windward Ave</Text>
            <Text style={styles.menottis}>Venice, CA 90620</Text>
            <Text style={styles.menottis}>(424) 205-7014</Text>
            <Text style={styles.menottis}>admin@menottis.com</Text>
            <Text style={styles.menottis}>https://www.yelp.com/biz/menottis-coffee-stop-venice</Text>
          </View>
          <View style={styles.menu}>
            {menuList}
            <Button onPress={() => this.props.submitOrder(this.props.order)} title="Submit order" />
          </View>
        </ScrollView>
      )
    }
    else {
      Menottis = null;
      return (
        <View>
          <Text>Restaurant NA</Text>
        </View>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
