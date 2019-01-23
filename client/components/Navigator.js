import { NavigatorIOS, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';

// import child components
import MainContainer from '../containers/MainContainer';
import * as actions from '../actions/actions';


const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(actions.logOut());
  },
});

const mapStateToProps = store => ({
  userLogIn: store.user.logged,
});

class NavigatorIOSApp extends React.Component {
	constructor(props) {
    super(props);
  }

  renderLogout = () => {
    const { userLogIn, logout } = this.props;
    if (userLogIn) {
      return (
        <TouchableOpacity onPress={() => logout()}>
          <Text style={styles.logout} >Logout</Text>
        </TouchableOpacity>
      );
    }
    return (<Text/>);
  }

  render = () => {
    const { logout } = this.props;
    return (
      <View style={styles.container}>
        <Text style={titleStyle.container}>Skippr</Text>
        {this.renderLogout()}
        <NavigatorIOS 
          style={{flex: 1, alignSelf: 'stretch'}}
          initialRoute={{component: MainContainer, title: 'Skippr'}}
          navigationBarHidden={true}
        />
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigatorIOSApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:50,
  },
  logout: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 15, 
  },
});

const titleStyle = StyleSheet.create({
  container: {
    fontSize: 75,
    fontWeight: 'bold',
  }
});
