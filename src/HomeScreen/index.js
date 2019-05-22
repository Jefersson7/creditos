import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

class HomeScreen extends Component {

  goToRegister = () => {
    this.props.navigation.navigate('Register')
  }

  goToAuth = () => {
    this.props.navigation.navigate('Auth')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textHeader}>Bienvenido, Seleccione una opcion</Text>
        <View style={styles.options}>
          <TouchableOpacity style={styles.button} onPress={this.goToRegister}>
            <Text>Registrarse</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.goToAuth}>
            <Text>Solicitar un credito</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#faedca'
  },

  textHeader: {
    textAlign: 'center',
    fontSize: 23,
    color: '#000000'
  },

  options: {
    textAlign: 'center',
    flexDirection: 'row',
  },

  button: {
    display: 'flex',
    padding: 10,
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c1dbb3'
  }
})

export default HomeScreen