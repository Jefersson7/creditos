import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Button
          title='Go to home'
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

export default DetailsScreen