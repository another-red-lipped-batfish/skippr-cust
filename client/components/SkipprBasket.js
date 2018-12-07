import React from 'react';
import {
  ScrollView, TouchableHighlight, View,
  Image, Text, Button, StyleSheet, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Toast from 'react-native-whc-toast';

class SkipprBasket extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {
		const currentOrders = [];
		const { menu, order, deleteOrder } = this.props;

		console.log('HEREEEEEE ', menu);
		console.log('YOOOOOO ', order);

		order.menuItems.map((orderIndex) => {
			const item = menu[orderIndex - 1];
			return currentOrders.push(
				<View style={{
					paddingBottom: 10, borderRadius: 3.5, textAlign: 'center', borderColor: 'lightblue', 
					borderWidth: 1, marginTop: 15, marginBottom: 10
				}}>
					<Text style={{fontStyle: 'bold', fontSize: 18, marginLeft: '1%', marginTop: 10}}> 
						{item.menu_item_name} 
					</Text>

					<Text style={{fontStyle: 'bold', fontSize: 15, marginLeft: '1%'}}>
						{item.menu_item_price}
					</Text>

					<Text style={{fontStyle: 'bold', ontSize: 12, marginLeft: '1%'}}>
						{item.menu_item_desc}
					</Text>

					<TouchableOpacity
              style={{
								borderRadius: 3,
								backgroundColor: 'red',
								borderColor: 'red',
								borderWidth: 3,
								padding: 5,
								alignItems: 'center',
								justifyContent: 'center',
							}}
              onPress={() => {        
								this.refs.toast.show('Removed ' + item.menu_item_name + '!', Toast.Duration.long, Toast.Position.top);
								return deleteOrder(item.menu_item_id);
              }}>
              <Text style={{color: 'white', fontSize: 18}}>Remove Item</Text>
          </TouchableOpacity>
				</View>
			)
		});

		return (
			<View> 
				<ScrollView style={{ height: '100%', width: '100%', borderColor: 'black', borderWidth: 2}}>
					<Text> ORDERS: </Text>
					{currentOrders}
					<Toast ref='toast' style={{ backgroundColor: '#005A9C', padding: 20, fontSize: 100 }} opacity={0.85} fadeInDuration = {50} fadeOutDuration = {50}/>
				</ScrollView>
			</View>
		)
	}
}

export default SkipprBasket;