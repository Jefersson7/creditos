import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import t from 'tcomb-form-native'
import moment from 'moment'

const Form = t.form.Form

let minTime = date => moment().diff(moment(date), 'years', true) >= 1.5

let notToday = date => moment().diff(moment(date), 'days') !== 0

let isPositive = number => number > 0

let isInteger = number => Number.isInteger(number)

let isInRange = number => number <= 100000000

let Date = t.refinement(t.Date, d => notToday(d) && minTime(d))

let Salary = t.refinement(t.Number, n => isInRange(n) && isInteger(n) && isPositive(n))

Date.getValidationErrorMessage = s => {
  if (!s) { return 'Ingrese una fecha' }
  if (!notToday(s)) { return 'La fecha no puede ser la de hoy' }
  if (!minTime(s)) { return 'Debe permanecer mas de año y medio en la empresa' }
}

Salary.getValidationErrorMessage = s => {
  if (!s) { return 'Ingrese un salario' }
  if (!isPositive(s)) { return 'Ingrese un valor mayor a 0' }
  if (!isInteger(s)) { return 'Ingrese un valor entero' }
  if (!isInRange(s)) { return 'Ingrese un valor menor a 100 millones' }
}

class ApplyScreen extends Component {

  options = {
    fields: {
      company: {
        label: 'Empresa',
        error: 'Ingrese el nombre de la empresa'
      },
      nit: {
        label: 'NIT',
        error: 'Ingrese el NIT con solo numeros'
      },
      salary: {
        label: 'Salario'
      },
      entryDate: {
        label: 'Fecha de ingreso',
        mode: 'date',
        config: {
          format: (date) => moment(date).format('DD-MM-YYYY'),
          defaultValueText: 'Pulse aquí para seleccionar una fecha'
        },
      }
    }
  }

  Info = t.struct({
    company: t.String,
    nit: t.Number,
    salary: Salary,
    entryDate: Date,
  })

  evaluateCredit = (value) => {
    if (value.salary < 800000) {
      return {
        isApproved: false,
        mountApproved: null
      }
    } else if (value.salary >= 800000 && value.salary < 1000000) {
      return {
        isApproved: true,
        mountApproved: '$5.000.000'
      }
    } else if (value.salary >= 1000000 && value.salary < 4000000) {
      return {
        isApproved: true,
        mountApproved: '$20.000.000'
      }
    } else {
      return {
        isApproved: true,
        mountApproved: '$50.000.000'
      }
    }
  }

  goToRegister = () => {
    this.props.navigation.navigate('Register')
  }

  handleSubmit = () => {
    let value = this._form.getValue()
    if (value) {
      let approved = this.evaluateCredit(value)
      this.props.navigation.navigate('Result', {
        isApproved: approved.isApproved,
        mountApproved: approved.mountApproved
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.formHeader}>Solicite un credito</Text>
        <Text style={styles.idText}>Identificacion: <Text style={styles.numText}>{this.props.navigation.state.params.identification}</Text></Text>
        <Form
          ref={c => this._form = c}
          type={this.Info}
          options={this.options}
        />
        <View style={styles.options}>
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text>Solicitar credito</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.goToRegister}>
            <Text>Registrar nuevo cliente</Text>
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

  idText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000'
  },

  numText: {
    fontSize: 20,
    fontWeight: 'normal'
  },

  options: {
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
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

export default ApplyScreen