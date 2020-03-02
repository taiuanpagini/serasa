import React, { Component, Fragment } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import stylesGlobal from '../styles/global'
import { Icon } from 'react-native-eva-icons'
import { Actions } from 'react-native-router-flux'
import { TextMask } from 'react-native-masked-text'
import store from '../redux/store'
import { AceitaProposta } from '../services/functions'

export default class CardOfertaDivida extends Component {
  constructor(props) {
    super(props)
    this.state = {
      img: ''
    }
  }

  aceitarOferta = (oferta, usuario) => {
    // console.log(oferta, usuario)
    AceitaProposta(oferta, usuario)
  }

  render() {
    if (this.props.oferta.id == 1) {
      var img = require('../assets/divida.png')
    } else if (this.props.oferta.id == 2) {
      var img = require('../assets/caixa.png')
    } else if (this.props.oferta.id == 3) {
      var img = require('../assets/cartao.png')
    } else if (this.props.oferta.id == 4) {
      var img = require('../assets/caixa.png')
    }
    const usuario = this.props.usuario
    return (
      <Fragment>
        {this.props.tipo != 'proposta-rg' ?
          <View style={styles.slide}>
            <View style={stylesGlobal.viewListaOfertaDivida}>
              <View style={stylesGlobal.viewLogoDividaOferta}>
                <Image style={stylesGlobal.imgDividaOferta} source={img} />
              </View>
              <View style={stylesGlobal.valorDivida}>
              {this.props.tipo == "divida" ? 
              <TextMask style={stylesGlobal.valorTotalDivida}
                  type={'money'}
                  options={{
                    obfuscated: true
                  }}
                  value={`${this.props.oferta.valorDivida}`}
                /> :
                <Text style={stylesGlobal.valorTotalDivida}>{this.props.tipo == "divida" ? `` : 'crédito máximo'}</Text>}
                <TextMask style={[stylesGlobal.valorTotalDivida, stylesGlobal.valorDividaDesconto]}
                  type={'money'}
                  options={{
                    obfuscated: true
                  }}
                  value={this.props.tipo == "divida" ? `por ${this.props.oferta.valorProposta}` : `Limite de ${this.props.oferta.limite}`}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => this.aceitarOferta(this.props.oferta, store.getState().usuario)} style={stylesGlobal.viewSaibaMais}>
              <Text style={stylesGlobal.saibaMais}>{this.props.tipo == "divida" ? "Negociar agora" : "Aceitar oferta"}</Text>
            </TouchableOpacity>
          </View>
          :
          <Fragment>
            <View style={stylesGlobal.viewListaOfertaDivida}>
              <View style={stylesGlobal.viewLogoDividaOferta}>
                <Icon name='credit-card-outline' width={60} height={60} fill={'#646464'} />
              </View>
              <View style={stylesGlobal.valorDivida}>
                <Text style={stylesGlobal.valorTotalDivida}>{usuario.pontuacao > 90 ? `R$ ${this.props.valorTotalFormatado}` : 'Aproveite'}</Text>
                <Text style={[stylesGlobal.valorTotalDivida, stylesGlobal.valorDividaDesconto]}>{usuario.pontuacao > 90 ? `por R$ ${this.props.valorDescontoFormatado}` : `apenas R$ ${this.props.valorTotalFormatado}`}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => { Actions.push('ProtejaRG', { proposta: this.props, usuario: usuario, graficoColor: this.props.graficoColor, nomeUsuario: this.props.nomeUsuario, interno: this.props.interno }) }} style={stylesGlobal.viewSaibaMais}>
              <Text style={stylesGlobal.saibaMais}>Saiba mais</Text>
            </TouchableOpacity>
          </Fragment>
        }
      </Fragment>
    )
  }
}

const styles = {
  slide: {
    justifyContent: 'center'
  }
}