import React, { Component, Fragment } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import stylesGlobal from '../styles/global'
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-eva-icons'
import * as Progress from 'react-native-progress';
import Header from '../components/Header';
import store from '../redux/store';

class ProtejaRG extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dividas: [],
      ofertas: [],
      pontuacao: {}
    }

    console.log(this.props)
  }

  componentDidMount() {
    AsyncStorage.getItem('dadosUsuario')
      .then((dadosUsuario) => {
        const dadosUsuarioParse = JSON.parse(dadosUsuario)
        this.setState({ nomeUsuario: dadosUsuarioParse[0].name })
        this.setState({ pontuacao: store.getState().usuario })
        const pontuacaoGrafico = this.state.pontuacao / 100
        this.setState({ graficoColor: pontuacaoGrafico })
      })
  }

  render() {
    const usuario = this.state.pontuacao
    return (
      <Fragment>
        <ScrollView>
          {/* HEADER */}
          <Header usuario={usuario} graficoColor={this.props.graficoColor} nomeUsuario={usuario.name} interno={true} />

          {/* VIEW PROPOSTA PROTEÇÃO RG */}
          <View style={stylesGlobal.cardScore}>
            <Text style={stylesGlobal.titleExplicaScore}>{this.props.proposta.oferta.title}</Text>
            <Text style={stylesGlobal.descriptionExplicaScore}>
              {this.props.proposta.oferta.descricao}
            </Text>
            <View style={stylesGlobal.viewPendenciaOferta}>
              <View style={stylesGlobal.viewListaOfertaDivida}>
                <View style={stylesGlobal.viewLogoDividaOferta}>
                  {/* <IconFontAwesome name='id-card' size={60} color='#646464' /> */}
                  <Icon name='credit-card-outline' width={60} height={60} fill={'#646464'} />
                </View>
                <View style={stylesGlobal.valorDivida}>
                  <Text style={stylesGlobal.valorTotalDivida}>{this.props.proposta.pontuacao > 90 ? `R$ ${this.props.proposta.valorTotalFormatado}` : 'Aproveite'}</Text>
                  <Text style={[stylesGlobal.valorTotalDivida, stylesGlobal.valorDividaDesconto]}>{this.props.proposta.pontuacao > 90 ? `por R$ ${this.props.proposta.valorDescontoFormatado}` : 'apenas R$ 110,00'}</Text>
                </View>
              </View>
              <TouchableOpacity style={[stylesGlobal.viewSaibaMais, stylesGlobal.btnContratarServico]}>
                <Text style={[stylesGlobal.saibaMais, stylesGlobal.txtContratarServico]}>Contratar Serviço</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Fragment>
    )
  }
}

export default ProtejaRG