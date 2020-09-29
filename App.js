import React, { Component } from 'react'
import { View } from 'react-native'
import { CalcScreen } from './src/views/screens'

export class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <CalcScreen />
      </View>
    )
  }
}

export default App
