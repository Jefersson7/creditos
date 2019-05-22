import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import t from 'tcomb-form-native'
import moment from 'moment'
import axios from 'axios'

const Form = t.form.Form

let min18 = date => moment().diff(moment(date), 'years') >= 18

let Birthday = t.refinement(t.Date, b => min18(b))

Birthday.getValidationErrorMessage = s => {
  if (!s) { return 'Ingrese una fecha de nacimiento' }
  if (!min18(s)) { return 'Debe tener 18 años o mas para ser cliente' }
}

let clientValidation = (id, callback) => {
  axios.get('https://testbankapi.firebaseio.com/clients.json')
    .then(response => {
      if (Object.values(response.data).find(c => c.identification === id.toString())) {
        console.log('a')
        callback(false)
      } else {
        console.log('b')
        callback(true)
      }
    })
}

class RegisterScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      options: this.options
    }
  }

  options = {
    fields: {
      identification: {
        label: 'Identificación',
        error: 'Debe digitar una identificación'
      },
      firstName: {
        label: 'Nombre'
      },
      lastName: {
        label: 'Apellido'
      },
      birthDate: {
        label: 'Fecha de Nacimiento',
        mode: 'date',
        config: {
          format: (date) => moment(date).format('DD-MM-YYYY'),
          defaultValueText: 'Pulse aquí para seleccionar una fecha'
        },
      },
    },
  };

  User = t.struct({
    identification: t.Number,
    firstName: t.String,
    lastName: t.String,
    birthDate: Birthday
  })

  goToAuth = () => {
    this.props.navigation.navigate('Auth')
  }

  handleSubmit = () => {
    let value = this._form.getValue()
    if (value) {
      this.setState({ value })
      clientValidation(value.identification.toString(), ok => {
        if (!ok) {
          this.setState({
            options: {
              fields: {
                ...this.options.fields,
                identification: {
                  label: 'Identificación',
                  hasError: true,
                  error: 'Existe un cliente con esta identificacion'
                }
              }
            }
          })
        } else {
          value = {
            ...value,
            birthDate: moment(value.birthDate).format('DD-MM-YYYY'),
            identification: value.identification.toString()
          }
          axios.post('https://testbankapi.firebaseio.com/clients.json', value)
        }
      })
    } else {
      this.setState({ options: this.options })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.formHeader}>Rellene el siguiente formulario</Text>
        <Form
          ref={c => this._form = c}
          type={this.User}
          options={this.state.options}
        />
        <View style={styles.options}>
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text>Registrar Nuevo cliente</Text>
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
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#faedca',
  },

  formHeader: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  options: {
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
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
});

export default RegisterScreen