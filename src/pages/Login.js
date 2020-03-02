import React, { Component, Fragment } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  Button,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/login'
import LinearGradient from 'react-native-linear-gradient';
import { executeQueryInterno } from '../services/dbUtil';
import { createTableLogin, selectUsuario, insertUsuarios, createTableOfertaDivida, insertOfertasDividas } from '../services/login';
import { TextInputMask } from 'react-native-masked-text'
import AsyncStorage from '@react-native-community/async-storage'
import Loading from '../components/Loading';
import { Icon } from 'react-native-eva-icons'
import { msgAlert, GetDadosUsuario } from '../services/functions';
import fetch from 'react-native-fetch-polyfill'
import store from '../redux/store';
import getDadosUsuario from '../redux/actions/usuarioAction';

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      codigo: '',
      mensagem: '',
      fadeValue: 0
    }
    //CRIA TABELA DE LOGIN
    executeQueryInterno(createTableLogin())
    //CRIA USUARIOS
    executeQueryInterno(insertUsuarios())
    //CRIA TABELA DE OFERTAS E PENDENCIAS E INSERE OS REGISTROS
    executeQueryInterno(createTableOfertaDivida())
    executeQueryInterno(insertOfertasDividas())
  }

  componentDidMount() {
  }

  validarUsuario = () => {
    this.setState({ fadeValue: 1, mensagem: 'Aguarde um instante!\n Estamos validando seus dados!' })

    if (!this.state.cpf && !this.state.senha) {
      let title = 'Campos obrigatórios'
      let msg = 'Todos os campos são obbrigatórios'
      msgAlert(title, msg)
    } else {
      const removeChar1 = this.state.cpf.replace(/\D/g, '')
      // PEGA OS DADOS DO USUARIO
      GetDadosUsuario(removeChar1, this.state.senha, this.alertErro.bind(this), this.setPageHome.bind(this))
    }

  }

  alertErro = (title, msg) => {
    this.setState({ fadeValue: 0 })
    setTimeout(() => {
      msgAlert(title, msg)
    }, 100);
  }

  setPageHome = (usuario) => {
    const uuidv1 = require('uuid/v1')
    const uid = uuidv1()
    AsyncStorage.setItem('@key', uid)
    AsyncStorage.setItem('dadosUsuario', JSON.stringify(usuario))
    store.dispatch(getDadosUsuario(usuario))
    //TIMEOUT APENAS PARA DEMONSTRAR O EFEITO DO LOADING
    setTimeout(() => {
      Actions.reset('Home')
      this.setState({ fadeValue: 0, mensagem: '' })
    }, 3000)
  }

  render() {
    const { cpf, senha } = this.state
    return (
      <Fragment>
        <Loading fadeValue={this.state.fadeValue} mensagem={this.state.mensagem} />
        <LinearGradient colors={['#f6f3fc', '#d2e0ff']} style={styles.container}>
          <Image source={require('../assets/serasa-consumidor.png')} />
          {/* <Text style={styles.welcome}>Fazer login.</Text> */}
          <Text style={styles.description}>Digite abaixo seu cpf e a senha cadastrados.</Text>
          <View style={{ marginHorizontal: 10, flexDirection: 'row' }}>
            <TextInputMask
              placeholder='Digite seu cpf'
              type={'cpf'}
              value={cpf}
              onChangeText={text => {
                this.setState({
                  cpf: text
                })
              }}
              style={[styles.input, styles.inputCpf]}
            />
          </View>
          <View style={{ marginHorizontal: 10, flexDirection: 'row' }}>
            <TextInput
              secureTextEntry
              placeholder='Digite sua senha'
              style={[styles.input, styles.inputCpf]}
              value={senha}
              onChangeText={senha => this.setState({ senha })}
            />
          </View>
          <View style={{ marginHorizontal: 10, flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.btnLogin}
              onPress={() => this.validarUsuario()}
            >
              <Text style={styles.txtbtnLogin}>Acessar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Fragment>
    );
  }
}

export default Login;