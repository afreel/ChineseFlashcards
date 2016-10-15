import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

export default class AppText extends Component {
  render() {
    return (
      <Text style={[{fontFamily: 'HelveticaNeue'}, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}
