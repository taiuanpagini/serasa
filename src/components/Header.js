import React, { Component, Fragment } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import stylesGlobal from '../styles/global'
import { Icon } from 'react-native-eva-icons'
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';
import store from '../redux/store';

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const usuario = this.props.usuario
    return (
      <Fragment>
        <LinearGradient colors={usuario.pontuacao < 31 ? ['#e06a22', '#e0ad14'] : usuario.pontuacao > 31 && usuario.pontuacao < 61 ? ['#6fc1bb', '#e2b514'] : ['#035c6a', '#6fc1bb']} style={[stylesGlobal.containerHeaderHome, this.props.ofertaDivida === true ? stylesGlobal.containerHeaderHomeOferta : null]}>
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 }}>
            <View style={[stylesGlobal.containerImgUser, this.props.interno === true ? stylesGlobal.containerImgUserInterno : null]}>
              <Image style={[stylesGlobal.imgUser, this.props.interno === true ? stylesGlobal.imgUserInterno : null]} source={{ uri: store.getState().usuario.avatar }} />
              <Progress.Circle style={{ position: 'absolute' }} progress={this.props.graficoColor} size={this.props.interno === true ? 70 : 180} indeterminate={false} borderWidth={0} thickness={6} color={usuario.pontuacao < 31 ? '#DC651F' : usuario.pontuacao > 31 && usuario.pontuacao < 61 ? '#6DC1C0' : '#16626F'} />
            </View>
            <Text style={[stylesGlobal.txtNomeUser, this.props.interno === true ? stylesGlobal.txtNomeUserInterno : null]}>{usuario.name}</Text>
          </View>
        </LinearGradient>
      </Fragment>
    )
  }
}

const styles = {
  slide: {
    justifyContent: 'center'
  }
}