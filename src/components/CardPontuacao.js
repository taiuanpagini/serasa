import React, { Component, Fragment } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import stylesGlobal from '../styles/global'
import { Icon } from 'react-native-eva-icons'
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux'

export default class CardPontuacao extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <Fragment>
        <View style={stylesGlobal.pontuacaoHome}>
          <Text style={stylesGlobal.valorPontuacao}>{this.props.pontuacao > 100 ? 100 : this.props.pontuacao}</Text>
          <Text style={stylesGlobal.textValorPontuacao}>Sua pontuação é {this.props.pontuacao < 31 ? 'baixa' : this.props.pontuacao > 31 && this.props.pontuacao < 61 ? 'média' : 'alta'}</Text>
        </View>
        <View style={stylesGlobal.graficoPontuacao}>
          <View style={stylesGlobal.viewSaibaMais}>
            <TouchableOpacity onPress={() => Actions.push('ExplicaScore', { pontuacao: this.props.pontuacao, graficoColor: this.props.graficoColor, nomeUsuario: this.props.nomeUsuario, interno: this.props.interno })}><Text style={stylesGlobal.saibaMais}>Saiba mais</Text></TouchableOpacity>
            <Icon name='chevron-up-outline' width={30} height={30} fill={'#646464'} />
          </View>
          <View style={stylesGlobal.graficos}>
            <View style={stylesGlobal.pontuacaoBaixa}>
              <Text style={stylesGlobal.textPontuacao}>0 a 30</Text>
              <LinearGradient colors={['#e06323', '#e2b514']} style={stylesGlobal.containerGradientPontuacaoBaixa} start={{ x: 0.0, y: 0 }} end={{ x: 1, y: 1.0 }} locations={[0, 1]} />
            </View>
            <View style={stylesGlobal.pontuacaoMedia}>
              <Text style={stylesGlobal.textPontuacao}>31 a 60</Text>
              <LinearGradient colors={['#e2b514', '#6fc1bb']} style={stylesGlobal.containerGradientPontuacaoMedia} start={{ x: 0.0, y: 0 }} end={{ x: 1, y: 1.0 }} locations={[0, 1]} />
            </View>
            <View style={stylesGlobal.pontuacaoAlta}>
              <Text style={stylesGlobal.textPontuacao}>61 a 100</Text>
              <LinearGradient colors={['#6fc1bb', '#035c6a']} style={stylesGlobal.containerGradientPontuacaoAlta} start={{ x: 0.0, y: 0 }} end={{ x: 1, y: 1.0 }} locations={[0, 1]} />
            </View>
          </View>
        </View>
      </Fragment>
    )
  }
}

const styles = {
  slide: {
    justifyContent: 'center'
  }
}