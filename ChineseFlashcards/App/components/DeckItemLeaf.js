import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import Swipeout from 'react-native-swipeout';

import AppText from './AppText.js';
import ChineseText from './ChineseText.js';

export default class DeckItemLeaf extends Component {
  render() {
    let swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'black',
      onPress: () => { console.log('deleting!!!!') }
    }];
    return (
      <Swipeout right={swipeBtns}
        autoClose='true'
        backgroundColor= 'transparent'
        scroll={event => this.props.scrollHandler(event)}>
        <TouchableHighlight onPress={this.props.pressHandler}>
          <View style={styles.row}>
            <View style={styles.topline}>
              <ChineseText style={styles.name}>{this.props.name}</ChineseText>
              <AppText style={styles.pinyin}>{this.props.pinyin}</AppText>
            </View>
            <View style={styles.bottomline}>
              <AppText style={styles.pos}>[{this.props.pos}]</AppText>
              <AppText
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.definition}
                >
                {this.props.definition}
              </AppText>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'flex-start',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#9B59B6',
  },
  topline: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingLeft: 5
  },
  bottomline: {
    flexDirection: 'row',
    paddingTop: 1,
    paddingLeft: 5,
  },
  name: {
    color: '#48C9B0', // light green
    fontSize: 18,
  },
  pinyin: {
    paddingLeft: 5,
    fontWeight: 'bold',
    fontSize: 18,
  },
  pos: {
    color: '#BDC3C7',
    fontSize: 16,
  },
  definition: {
    paddingLeft: 5,
    width: 300,
    fontSize: 16,
  }
});
