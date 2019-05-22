import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

class ResultScreen extends Component {

  goToRegister = () => {
    this.props.navigation.navigate('Register')
  }

  goToAuth = () => {
    this.props.navigation.navigate('Auth')
  }

  render() {
    let { isApproved, mountApproved } = this.props.navigation.state.params
    return (
      <React.Fragment>
        {
          isApproved ? (
            <View style={styles.containerApproved}>
              <Text style={styles.text}>El crédito fue aprobado por un monto de {mountApproved}</Text>
              <View style={styles.options}>
                <TouchableOpacity style={styles.buttonSuccess} onPress={this.goToRegister}>
                  <Text>Registrarse</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSuccess} onPress={this.goToAuth}>
                  <Text>Solicitar un credito</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
              <View style={styles.containerRejected}>
                <Text style={styles.text}>El credito no fue aprobado debido a que gana menos de $800.000</Text>
                <View style={styles.options}>
                  <TouchableOpacity style={styles.buttonRejected} onPress={this.goToRegister}>
                    <Text>Registrarse</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonRejected} onPress={this.goToAuth}>
                    <Text>Solicitar un credito</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
        }
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  containerApproved: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#c1dbb3'
  },

  containerRejected: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2c078'
  },

  text: {
    fontSize: 30,
    textAlign: 'center'
  },

  options: {
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },

  buttonSuccess: {
    display: 'flex',
    padding: 10,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7eb089'
  },

  buttonRejected: {
    display: 'flex',
    padding: 10,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c1dbb3'
  }
})

export default ResultScreen