import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ItemList from './ItemList.js';
import DeckItem from './DeckItem.js';
import DeckItemLeaf from './DeckItemLeaf.js';
import DeckFooter from './DeckFooter.js';

export default class DeckPage extends Component {
  render() {
    let json = this.props.json;
    let DeckItems = [];
    if (this.props.isLeafPage) {
      for (let key in json) {
        let name = json[key]['name'];
        // just a double check
        if (json[key]['isLeaf']) {
          DeckItems.push(
            <DeckItemLeaf
              key={key}
              name={name}
              pinyin={json[key]['pinyin']}
              definition={json[key]['definition']}
              pos={json[key]['pos']}
            />
          );
        }
      }
    } else {
      for (let key in json) {
        let name = json[key]['name'];
        // just a double check
        if (!json[key]['isLeaf']) {
          DeckItems.push(
            <DeckItem
              pressHandler={ () => {
                this.props.onForward(key, name)
              }}
              key={key}
              name={name}
            />
          );
        }
      }
    }
    return (
      <View style={{flex: 1}}>
        <ItemList style={{flex: 1}}>
          {DeckItems}
        </ItemList>
        <DeckFooter
          isLeafPage={this.props.isLeafPage}
          isHomePage={this.props.isHomePage}
          pageParentId={this.props.parentId}
        />
      </View>
    );
  }
}
