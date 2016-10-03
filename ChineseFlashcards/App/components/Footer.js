import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class Footer extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.pressHandler}>
        <View style={styles.footer}>
          <Text style={styles.text}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    height: 50,
    backgroundColor: '#BDC3C7',
  },
  text: {
    color: '#F8F9F9',
    paddingTop: 15,
    textAlign: 'center',
  }
});