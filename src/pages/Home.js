import React, { Component, Fragment } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import stylesGlobal from '../styles/global'
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { executeQueryInterno } from '../services/dbUtil';
import { selectDividas, selectOfertas, selectPropostaRG } from '../services/login';
import Swiper from 'react-native-swiper'
import CardOfertaDivida from '../components/CardOfertaDivida';
import CardPontuacao from '../components/CardPontuacao';
import Header from '../components/Header';
import { Icon } from 'react-native-eva-icons'
import store from '../redux/store';
import getDadosUsuario from '../redux/actions/usuarioAction';
import { GetPropostasAcordo, GetPropostasCredito } from '../services/functions';

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dividas: [],
      ofertas: [],
      propostaRG: [],
      loading: true,
      usuario: {}
    }

    store.subscribe(() => {
      this.setState({ usuario: store.getState().usuario })
      AsyncStorage.setItem('dadosUsuario', JSON.stringify(store.getState().usuario))
      const pontuacaoGrafico = store.getState().usuario.pontuacao / 100
      this.setState({ graficoColor: pontuacaoGrafico })
    })
  }

  componentDidMount() {
    AsyncStorage.getItem('dadosUsuario')
      .then((dadosUsuario) => {
        const dadosUsuarioParse = JSON.parse(dadosUsuario)
        store.dispatch(getDadosUsuario(dadosUsuarioParse))
        this.setState({ nomeUsuario: dadosUsuarioParse.name })
        this.setState({ pontuacao: dadosUsuarioParse.pontuacao })

        executeQueryInterno(selectPropostaRG())
          .then((propostaRG) => {
            this.setState({ propostaRG })
            GetPropostasAcordo(this.returnRequestDividas.bind(this))
            GetPropostasCredito(this.returnRequestCredito.bind(this))
          })
      })
  }

  returnRequestDividas = (dividas) => {
    this.setState({ loading: false, dividas })
  }

  returnRequestCredito = (ofertas) => {
    this.setState({ loading: false, ofertas })
  }

  dividas = () => {
    return this.state.dividas.map((divida) => {
      return (
        <CardOfertaDivida key={divida.id} oferta={divida} tipo={'divida'} />
      )
    })
  }

  ofertas = () => {
    return this.state.ofertas.map((oferta) => {
      return (
        <CardOfertaDivida key={oferta.id} oferta={oferta} tipo={'ofertas'} />
      )
    })
  }

  propostaRG = () => {
    return this.state.propostaRG.map((proposta) => {
      const valorDesconto = proposta.valorTotal - (proposta.valorTotal * proposta.valorDesconto) / 100
      const valorDescontoFormatado = valorDesconto.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
      const valorTotalFormatado = proposta.valorTotal.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
      return (
        <CardOfertaDivida usuario={this.state.usuario} key={proposta.id} oferta={proposta} tipo={'proposta-rg'} valorDescontoFormatado={valorDescontoFormatado} valorTotalFormatado={valorTotalFormatado} graficoColor={this.state.graficoColor} />
      )
    })
  }

  render() {
    return (
      <Fragment>
        <ScrollView>
          {/* HEADER */}
          <Header usuario={this.state.usuario} pontuacao={this.state.usuario.pontuacao} graficoColor={this.state.graficoColor} nomeUsuario={this.state.usuario.name} />

          {/* VIEW PONTUACAO */}
          <View style={stylesGlobal.cardScore}>
            <CardPontuacao usuario={this.state.usuario} pontuacao={this.state.usuario.pontuacao} graficoColor={this.state.graficoColor} nomeUsuario={this.state.usuario.name} />
          </View>

          {/* VIEW PROTEÇÃO RG - SE O SCORE FOR MAIOR QUE 50 OFERECE O PROGRAMA E SE FOR MAIOR QUE 91 OFERECE DESCONTO */}
          {this.state.usuario.pontuacao > 50 ?
            <View style={[stylesGlobal.cardScore, stylesGlobal.cardDividas]}>
              <View style={[stylesGlobal.pontuacaoHome, stylesGlobal.pontuacaoHomeLeft]}>
                <Text style={stylesGlobal.textValorPontuacao}>Proteja seu RG contra fraudes</Text>
                <Text style={stylesGlobal.textDescontoRg}>
                  {this.state.usuario.pontuacao > 90 ?
                    'Parabéns! Seu score é ótimo e com isso você tem vantagens, disponibilizamos para você um desconto de 15% em nosso programa de proteção ao RG.'
                    :
                    'Seu score é muito bom e com isso você tem vantagens, oferecemos para você o nosso programa de proteção ao RG.'
                  }
                </Text>
              </View>
              <View style={stylesGlobal.viewPendenciaOferta}>
                {this.propostaRG()}
              </View>
            </View> : null}

          {/* VIEW DIVIDAS - SE O SCORE FOR MENOR QUE 30*/}
          {this.state.usuario.pontuacao < 31 ?
            <View style={[stylesGlobal.cardScore, stylesGlobal.cardDividas, stylesGlobal.cardDividasSwiper]}>
              <View style={stylesGlobal.viewOfertaDividaTitle}>
                <Icon name='file-text-outline' width={22} height={22} fill={'#646464'} style={{ marginRight: 10 }} />
                <Text style={stylesGlobal.titleOfertaDivida}>Negocie suas dívidas</Text>
              </View>
              <View style={stylesGlobal.viewPendenciaOferta}>
                <Text style={stylesGlobal.subtitleOfertaDivida}>Você possui uma pendência com</Text>
                <Swiper showsButtons={false} height={200}>
                  {this.dividas()}
                </Swiper>
              </View>
            </View> : null}

          {/* VIEW CREDITO */}
          {this.state.usuario.pontuacao > 30 ?
            <View style={[stylesGlobal.cardScore, stylesGlobal.cardDividas, stylesGlobal.cardDividasSwiper]}>
              <View style={stylesGlobal.viewOfertaDividaTitle}>
                <Icon name='credit-card-outline' width={22} height={22} fill={'#646464'} style={{ marginRight: 10 }} />
                <Text style={[stylesGlobal.titleOfertaDivida, stylesGlobal.titleOferta]}>Proposta de crédito</Text>
              </View>
              <View style={stylesGlobal.viewPendenciaOferta}>
                <Text style={stylesGlobal.subtitleOfertaDivida}>Encontramos uma ofertas de crédito!</Text>
                <Swiper showsButtons={false} height={200}>
                  {this.ofertas()}
                </Swiper>
              </View>
            </View> : null}
        </ScrollView>
      </Fragment >
    );
  }
}


export default Home;