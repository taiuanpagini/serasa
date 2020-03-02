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
import * as Progress from 'react-native-progress';
import { executeQueryInterno } from '../services/dbUtil';
import Header from '../components/Header';
import store from '../redux/store';

class ExplicaScore extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dividas: [],
      ofertas: []
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <Fragment>
        <ScrollView>
          {/* HEADER */}
          <Header usuario={store.getState().usuario} graficoColor={this.props.graficoColor} nomeUsuario={this.props.nomeUsuario} interno={true} />

          {/* VIEW EXPLICA SCORE */}
          <View style={stylesGlobal.cardScore}>
            <Text style={stylesGlobal.titleExplicaScore}>Score de 0 a 30</Text>
            <Text style={stylesGlobal.descriptionExplicaScore}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula eros ac mauris facilisis ullamcorper. Fusce a sem lectus. Ut tempus a arcu at efficitur.
            </Text>

            <Text style={stylesGlobal.titleExplicaScore}>Score de 31 a 60</Text>
            <Text style={stylesGlobal.descriptionExplicaScore}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula eros ac mauris facilisis ullamcorper. Fusce a sem lectus. Ut tempus a arcu at efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula eros ac mauris facilisis ullamcorper.
            </Text>

            <Text style={stylesGlobal.titleExplicaScore}>Score de 61 a 100</Text>
            <Text style={stylesGlobal.descriptionExplicaScore}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula eros ac mauris facilisis ullamcorper. Fusce a sem lectus. Ut tempus a arcu at efficitur, consectetur adipiscing elit. Duis vehicula eros ac mauris facilisis ullamcorper. Fusce a sem lectus. Ut tempus a arcu at efficitur.
            </Text>
          </View>
        </ScrollView>
      </Fragment>
    )
  }
}

export default ExplicaScore