import React, { Component, Fragment } from 'react'
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux';
import {Icon} from 'react-native-eva-icons'
import AsyncStorage from '@react-native-community/async-storage';
import { executeQueryInterno } from '../services/dbUtil';
import { dropTableOfertaDivida, dropTableUsuarios } from '../services/login';
import Loading from './Loading';

export default class ButtonsRight extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mensagem: '',
      fadeValue: 0
    }
  }

  confirmaSair = () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair do aplicativo?',
      [
        {
          text: 'Não',
        },
        { text: 'Sim', onPress: () => this.sair() }
      ]
    )
  }

  sair = () => {
    this.setState({ fadeValue: 1, mensagem: 'Obrigado por utilizar o \nSerasa Consumidor!' })
    AsyncStorage.multiRemove(['@key','dados'])
    executeQueryInterno(dropTableUsuarios())
    executeQueryInterno(dropTableOfertaDivida())
    //TIMEOUT APENAS PARA DEMONSTRAR O EFEITO DO LOADING
    setTimeout(() => {
      Actions.reset('Login')
      this.setState({ fadeValue: 0, mensagem: '' })
    },5000)
  }

  render() {
    return (
      <Fragment>
        <Loading fadeValue={this.state.fadeValue} mensagem={this.state.mensagem} />
        <View style={{ marginRight: 11 }}>
          <TouchableOpacity onPress={() => { this.confirmaSair() }}>
            <Icon name='log-out-outline' width={25} height={25} fill={'#FFFFFF'} style={styleLocal.iconLogout} />
          </TouchableOpacity>
        </View>
      </Fragment>
    )
  }
}

const styleLocal = {
  iconLogout: {
    color: '#FFFFFF',
    fontSize: 22
  }
}