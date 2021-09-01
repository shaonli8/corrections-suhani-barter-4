import React from 'react';
import LottieView from 'lottie-react-native';

export default class BARTER extends React.Component {
  render() {
    return (
      <LottieView
      source={require('../assets/barter.json')}
      style={{width:"60%"}}
      autoPlay loop />
    )
  }
}
