import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

export default class ChineseText extends Component {
  render() {
    return (
      <Text style={[{fontFamily: 'PingFangTC-Semibold'}, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}
