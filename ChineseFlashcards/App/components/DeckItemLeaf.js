import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import AppText from './AppText.js';
import ChineseText from './ChineseText.js';

export default class DeckItemLeaf extends Component {
  render() {
    return (
      <TouchableHighlight>
        <View style={styles.row}>
          <View style={styles.topline}>
            <Text style={styles.name}>
              <ChineseText>{this.props.name}</ChineseText>
            </Text>
            <Text style={styles.pinyin}>
              <AppText>{this.props.pinyin}</AppText>
            </Text>
          </View>
          <View style={styles.bottomline}>
            <Text style={styles.pos}>
              <AppText>[{this.props.pos}]</AppText>
            </Text>
            <Text style={styles.definition}>
              <AppText>{this.props.definition}</AppText>
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'flex-start',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#9B59B6',
  },
  topline: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingLeft: 5,
  },
  bottomline: {
    flexDirection: 'row',
    paddingTop: 1,
    paddingLeft: 5,
  },
  name: {
    color: '#48C9B0',
    fontSize: 15,
  },
  pinyin: {
    paddingLeft: 5,
    fontWeight: 'bold',
    fontSize: 15,
  },
  pos: {
    color: '#BDC3C7'
  },
  definition: {
    paddingLeft: 5,
  }
});
