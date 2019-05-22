import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import RegisterScreen from './RegisterScreen'
import HomeScreen from './HomeScreen'
import AuthScreen from './Auth'
import ApplyScreen from './ApplyForCredit'
import ResultScreen from './ResultScreen'
import t from 'tcomb-form-native'

t.form.Form.stylesheet.textbox.normal.backgroundColor = '#ffffff'
t.form.Form.stylesheet.textbox.error.backgroundColor = '#ffffff'
t.form.Form.stylesheet.textbox.error.borderColor = '#fe5d26'
t.form.Form.stylesheet.textbox.error.color = '#fe5d26'


const AppNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
    Home: HomeScreen,
    Register: RegisterScreen,
    Apply: ApplyScreen,
    Result: ResultScreen
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home'
  }
)

const AppContainer = createAppContainer(AppNavigator)

export default class App extends Component {
  render() {
    return <AppContainer />
  }
}
