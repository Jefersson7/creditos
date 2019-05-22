import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import t from 'tcomb-form-native'
import axios from 'axios'

const Form = t.form.Form

let clientValidation = (id, callback) => {
  axios.get('https://testbankapi.firebaseio.com/clients.json')
    .then(response => {
      if (Object.values(response.data).filter(c => c.identification === id.toString()).length === 0) {
        callback(false)
      } else {
        callback(true)
      }
    })
}

class AuthScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      options: {
        fields: {
          identification: {
            label: 'Identificacion',
            error: 'Debe digitar una identificacion'
          }
        }
      }
    }
  }

  User = t.struct({
    identification: t.Number
  })

  handleSubmit = () => {
    let value = this._form.getValue()
    if (value) {
      this.setState({ value })
      clientValidation(value.identification.toString(), ok => {
        if (!ok) {
          this.setState({
            options: {
              fields: {
                identification: {
                  label: 'Identificacion',
                  hasError: true,
                  error: 'No existe un cliente con esta identificacion'
                }
              }
            }
          })
        } else {
          this.setState({ value: null })
          this.props.navigation.navigate('Apply', {
            identification: value.identification
          })
        }
      })
    } else {
      this.setState({
        options: {
          fields: {
            identification: {
              label: 'Identificacion',
              error: 'Debe digitar una identificacion'
            }
          }
        },
        value: null
      })
    }
  }

  render() {
    let { options } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.formHeader}>Identifiquese como cliente</Text>
        <Form
          ref={c => this._form = c}
          type={this.User}
          value={this.state.value}
          options={options}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text>Identifiquese</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#faedca'
  },

  formHeader: {
    color: '#000000',
    fontSize: 23,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold'
  },

  button: {
    display: 'flex',
    padding: 10,
    marginTop: 0,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c1dbb3'
  }
})

export default AuthScreen
