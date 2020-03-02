import React, { Component } from 'react';
import {
  Animated,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native'
import Modal from 'react-native-modal'

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    if (this.props.fadeValue != 0) {
      return (
        <Modal
          isVisible={this.props.fadeValue != 0}
          backdropOpacity={1}
          backdropColor={"#BA2F7D"}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={100}
          animationOutTiming={100}
          backdropTransitionInTiming={100}
          backdropTransitionOutTiming={100}
        >
          <View style={this.props.fadeValue != 0 ? styles.container : styles.hide}>
            <Animated.Image style={[styles.animationView]} source={require("../assets/serasa-consumidor-logo.png")} />
            <ActivityIndicator style={styles.indicator} size="large" color="white"></ActivityIndicator>
            <View style={styles.containerMsg}>
              <Text style={styles.white}>{this.props.mensagem}</Text>
            </View>
          </View>
        </Modal>
      )
    } else {
      return (
        <View />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BA2F7D',
    zIndex: 0,
    position: 'relative',
    flexDirection: 'column',
  },
  animationView: {
    width: 130,
    height: 170,
  },
  indicator: {
    marginTop: 40,
    marginBottom: 20
  },
  hide: {
    width: 0,
    height: 0
  },
  white: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  containerMsg: {
    width: Dimensions.get('screen').width - 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Loading
