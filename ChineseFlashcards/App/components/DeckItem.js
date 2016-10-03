import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class DeckItem extends Component {

  render() {
    return (
      <TouchableHighlight onPress={this.props.pressHandler}>
        <View style={styles.row}>
          <View style={styles.text}>
            <Text>{this.props.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#9B59B6',
  },
  text: {
    justifyContent: 'center',
  }
});
