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

	renderSubmitOrder() {
    const { menuLoaded, menu, order, submitOrder } = this.props;
		
		if (menuLoaded && menu.length > 0) {
      return (
				<View style={{justifyContent: 'top', alignItems: 'center'}}>
					<TouchableOpacity 
						style={{marginBottom: 5, marginTop: 15,
						borderRadius: 10,
						backgroundColor: '#007bff',
						borderColor: '#007bff',
						borderWidth: 3,
						fontStyle: 'italic',
						padding: 7,
						width: '95%',
						alignItems: 'center',
						justifyContent: 'center',}}
						onPress={() => {
							if (order.menuItems.length !== 0) {
								submitOrder(order)
								this.props.navigator.pop();
							} else {
								this.refs.toast.show('Empty order! Please add items before submitting order.', Toast.Duration.short, Toast.Position.center)
							}
						}}
					>
						<Text style={{color: 'white'}}>Submit Order</Text>
					</TouchableOpacity>
				</View>);
    } else {
      return null;
		}
	};

	renderOrderList(list) {
		if (list.length === 0) return (
			<View style={{height: 400, justifyContent: 'center'}}> 
				<Text style={{fontSize: 30, color: 'lightgrey'}}> 
					No orders to display &#9785;
				</Text>
			</View>
		);
		else return (
			<View style={{ height: '100%', justifyContent: 'top' }}>
				{list}
			</View>
		);
	};

	render() {
		const currentOrders = [];
		const { menu, order, deleteOrder } = this.props;
		let total = 0;

		order.menuItems.map((orderIndex) => {
			const item = menu[orderIndex - 1];
			total += (item.menu_item_price * 1);
			return currentOrders.push(
				<View key={`v1_${item.menu_item_id}`} style={{
					paddingBottom: 10, borderRadius: 3.5, textAlign: 'center', borderColor: 'lightblue', 
					borderWidth: 1, marginBottom: 2, width: 350
				}}>
					<View key={`v2_${item.menu_item_id}`} style={{flexDirection: 'row', justifyContent: 'space-between'}}> 
						<Text key={`min_${item.menu_item_id}`} style={{
							fontStyle: 'italic', fontSize: 20, marginLeft: '1%', 
							marginTop: 10, marginBottom: 20, textAlign: 'left'
						}}> 
							&nbsp; Item: {item.menu_item_name} 
						</Text>

						<Text key={`mip_${item.menu_item_id}`} style={{
							fontStyle: 'italic', fontSize: 20, marginLeft: '1%', 
							marginTop: 10, textAlign: 'right', marginBottom: 20
						}}>
							Price: {item.menu_item_price} &nbsp;
						</Text>
					</View>
					<TouchableOpacity
              style={{
								borderRadius: 3,
								backgroundColor: 'lightgrey',
								borderColor: 'lightgrey',
								borderWidth: 3,
								padding: 5,
								alignItems: 'center',
								justifyContent: 'center',
							}}
              onPress={() => {        
								this.refs.toast.show('Removed ' + item.menu_item_name + '!', Toast.Duration.long, Toast.Position.top);
								return deleteOrder(item.menu_item_id);
              }}>
              <Text style={{color: 'red', fontSize: 20, fontStyle: 'italic'}}>&#10007; Remove Item</Text>
          </TouchableOpacity>
				</View>
			)
		});

		return (
			<View> 
				<View style={{ justifyContent: 'center', alignItems: 'center'}}>
					<Text style={{
							width: '85%',
							padding: 5,
							marginBottom: 10,
							marginTop: 10,
							textAlign: 'center',
							fontSize: 30,
							textDecorationLine: 'underline'
						}}> 
						Order Details: </Text>
					</View>
				<ScrollView style={{ 
					height: '67%', width: '99%',
					borderColor: 'lightgrey', borderWidth: 2, borderRadius: 1, paddingTop: 10
				}} contentContainerStyle={{ alignItems: 'center' }}>
					{this.renderOrderList(currentOrders)}
					<Toast ref='toast' style={{ backgroundColor: 'red', padding: 20}} opacity={0.85} fadeInDuration = {50} fadeOutDuration = {50}/>
				</ScrollView>
				<View style={{
					textAlign: 'left',
					borderColor: 'black', borderRadius: 1, borderWidth: 1,
					backgroundColor: 'black', padding: 8
				}}>
					<Text style={{fontSize: 25, fontStyle: 'italic', color: 'white'}}>Total: ${total}</Text>
				</View>
				{this.renderSubmitOrder()}
			</View>
		)
	}
}

export default SkipprBasket;