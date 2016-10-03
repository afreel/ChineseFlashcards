import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class Header extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.pressHandler}>
        <View style={styles.header}>
          <Text style={styles.text}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: '#9B59B6',
  },
  text: {
    color: '#F8F9F9',
    paddingTop: 25,
    textAlign: 'center',
  }
});