import { Dimensions } from "react-native";

const stylesGlobal = {
  containerHeaderHome: {
    paddingBottom: 150,
  },
  containerHeaderHomeOferta: {
    paddingBottom: 30
  },
  containerImgUser: {
    marginTop: 60,
    marginBottom: 20,
    shadowColor: '#333333',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: .4,
    shadowRadius: 10,
    elevation: 6,
  },
  containerImgUserInterno: {
    marginTop: 30
  },
  imgUser: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 6,
    borderColor: '#FFFFFF',
  },
  imgUserInterno: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  txtNomeUser: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '600'
  },
  txtNomeUserInterno: {
    fontSize: 22
  },
  cardScore: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    padding: 20,
    marginTop: -130,
    marginBottom: 40,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: .2,
    shadowRadius: 10,
    elevation: 6,
  },
  cardPropostasOfertas: {
    paddingHorizontal: 20,
    paddingVertical: 0,
    marginTop: -30,
  },
  cardDividas: {
    marginTop: 0
  },
  cardDividasSwiper: {
    paddingBottom: 0
  },
  pontuacaoHome: {
    width: '100%',
    alignItems: 'center',
    borderColor: '#646464',
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginBottom: 15,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  pontuacaoHomeLeft: {
    alignItems: 'flex-start'
  },
  valorPontuacao: {
    fontSize: 70,
    fontWeight: '600',
    color: '#646464'
  },
  textValorPontuacao: {
    color: '#646464',
    fontSize: 20,
    fontWeight: '500'
  },
  textDescontoRg: {
    color: '#646464'
  },
  graficoPontuacao: {
    flexDirection: 'column',
  },
  graficos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25
  },
  viewSaibaMais: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  btnContratarServico: {
    backgroundColor: '#70195d',
    paddingVertical: 10,
    borderRadius: 5
  },
  saibaMais: {
    color: '#70195d',
    fontSize: 18,
    fontWeight: '600'
  },
  txtContratarServico: {
    color: '#FFFFFF',
    fontSize: 15
  },
  pontuacaoBaixa: {
    width: '33%'
  },
  pontuacaoMedia: {
    width: '33%'
  },
  pontuacaoAlta: {
    width: '33%'
  },
  textPontuacao: {
    alignSelf: 'center'
  },
  containerGradientPontuacaoBaixa: {
    width: '100%',
    height: 10
  },
  containerGradientPontuacaoMedia: {
    height: 10
  },
  containerGradientPontuacaoAlta: {
    height: 10
  },
  viewOfertaDividaTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#646464',
    paddingBottom: 5,
    marginBottom: 15
  },
  titleOfertaDivida: {
    color: '#e06a20',
    fontSize: 18,
    fontWeight: '500'
  },
  titleOferta: {
    color: '#035c6a',
  },
  viewPendenciaOferta: {
    flexDirection: 'column'
  },
  subtitleOfertaDivida: {
    fontSize: 18,
    color: '#646464',
    fontWeight: '500'
  },
  viewListaOfertaDivida: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  viewLogoDividaOferta: {
    width: 150,
    height: 90,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  imgDividaOferta: {
    width: Dimensions.get('window').width <= 400 ? 90 : 100,
    resizeMode: 'contain',
  },
  valorTotalDivida: {
    alignSelf: 'flex-end',
    color: '#cdcdcd',
    fontSize: 15,
    fontWeight: '500'
  },
  valorDividaDesconto: {
    color: '#666666',
    fontSize: 18,
    marginTop: 5,
    fontWeight: '600'
  },
  titleExplicaScore: {
    fontSize: 18,
    fontWeight: '700',
    color: '#646464',
    marginBottom: 5
  },
  descriptionExplicaScore: {
    fontSize: 14,
    fontWeight: '400',
    color: '#646464',
    marginBottom: 15
  }
}

export default stylesGlobal