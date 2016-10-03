import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ItemList from './ItemList.js';
import DeckItem from './DeckItem.js';
import Header from './Header.js';
import Footer from './Footer.js';

export default class DeckPage extends Component {
  render() {
    let json = this.props.json;
    let DeckItems = [];
    for (let key in json) {
      let name = json[key];
      DeckItems.push(
        <DeckItem
          pressHandler={ () => {
            this.props.onForward(key, name)
          }}
          title={name}
          key={key}
        />
      );
    }
    return (
      <View style={{flex: 1}}>
        <ItemList style={{flex: 1}}>
          {DeckItems}
        </ItemList>
        <Footer pressHandler={this.props.onBack} title={this.props.footer} />
      </View>
    );
  }
}
