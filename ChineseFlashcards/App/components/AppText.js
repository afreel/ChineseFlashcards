import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

export default class AppText extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text {...this.props} style={[{fontFamily: 'HelveticaNeue'}, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}
