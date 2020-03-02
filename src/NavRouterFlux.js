
// app/index.js

import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native'
import { Router, Scene, Stack } from 'react-native-router-flux';

import Login from './pages/Login';
import Home from './pages/Home';
import ButtonsRight from './components/ButtonsRight';
import ExplicaScore from './pages/ExplicaScore';
import ProtejaRG from './pages/ProtejaRG';

const NavRouterFlux = (props) => {
  const signed = props.sign
  return (
    <Router navigationBarStyle={styles.navBar} tintColor='#FFFFFF'>
      <Stack key="root" >
        <Scene key="Login"
          component={Login}
          title=""
          hideNavBar
          initial={!signed}
          drawerLockMode='locked-closed' gesturesEnabled={false} back={true} />
        <Scene key="Home"
          component={Home}
          title="HOME"
          initial={signed}
          renderTitle={() => (
            <View>
              <Image source={require('./assets/logo-header.png')} style={styles.image} />
            </View>
          )}
          renderLeftButton={() => { }}
          drawerLockMode='locked-closed' gesturesEnabled={false}
          renderRightButton={() => <ButtonsRight />} />
        <Scene key="ExplicaScore"
          component={ExplicaScore}
          title=""
          renderTitle={() => (
            <View>
              <Image source={require('./assets/logo-header.png')} style={styles.image} />
            </View>
          )}
          drawerLockMode='locked-closed' gesturesEnabled={false} back={true}
          renderRightButton={() => <ButtonsRight />} />
        <Scene key="ProtejaRG"
          component={ProtejaRG}
          title=""
          renderTitle={() => (
            <View>
              <Image source={require('./assets/logo-header.png')} style={styles.image} />
            </View>
          )}
          drawerLockMode='locked-closed' gesturesEnabled={false} back={true}
          renderRightButton={() => <ButtonsRight />} />
      </Stack>
    </Router>
  );
}

const styles = {
  navBar: {
    backgroundColor: '#ba2f7d',
    borderBottomWidth: 0,
    paddingVertical: 5
  },
  image: {
    width: Dimensions.get('window').width <= 400 ? 120 : 130,
    resizeMode: 'contain'
  },
}

export default NavRouterFlux;