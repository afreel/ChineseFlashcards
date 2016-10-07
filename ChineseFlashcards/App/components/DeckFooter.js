import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import AppText from './AppText.js';

export default class DeckFooter extends Component {
  addDeck() {

  }

  addLeaf() {

  }

  render() {
    let text;
    let pressHandler;
    if (this.props.isLeafPage) {
      text = 'Add Card';
      pressHandler = this.addLeaf;
    } else {
      text = this.props.isHomePage ? 'Add Deck' : 'Add Subdeck';
      pressHandler = this.addDeck;
    }
    return (
      <TouchableHighlight onPress={pressHandler}>
        <View style={styles.footer}>
          <Text style={styles.text}>
            <AppText>{text}</AppText>
          </Text>
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
