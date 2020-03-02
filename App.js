/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { executeQueryInterno } from './src/services/dbUtil';
import { selectLancamentos, createTableLogin, insertUsuario, selectAllUsuarios } from './src/services/login';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    console.disableYellowBox = true
    console.ignoredYellowBox = true
    executeQueryInterno(createTableLogin())
    executeQueryInterno(insertUsuario())
    const usuarios = executeQueryInterno(selectAllUsuarios())
    usuarios.then((usuarios) => {
      console.log(usuarios)
    })
  }

  render() {
    return (
      <View />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
