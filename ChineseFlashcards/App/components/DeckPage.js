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

  constructor(props) {
    super(props);
    this.state = this.props.json;
  }

  addDeckElement(id, name) {
    console.log('Attempting to add deck element ' + name + ' with id ' + id);
    let addState = {};
    addState[id] = {'name': name};
    this.setState(addState);
  }

  addLeafElement(id, name, pinyin, definition, pos) {
    console.log('Attempting to add leaf element ' + name + ' with id ' + id);
    let addState = {};
    addState[id] = {
      'name': name,
      'pinyin': pinyin,
      'definition': definition,
      'pos': pos,
      'isLeaf': 1
    };
    this.setState(addState);
  }

  render() {
    let json = this.state;
    let DeckItems = [];
    let vocabulary = [];
    for (let key in json) {
      if (json[key]['isLeaf']) {
        vocabulary.push(json[key]);
      }
    }
    let vocabIndex = 0; // used to track which vocabulary card is clicked
    for (let key in json) {
      let localVocabIndex = vocabIndex;
      let name = json[key]['name'];
      if (json[key]['isLeaf']) {
        DeckItems.push(
          <DeckItemLeaf
            pressHandler={ () => {
              this.props.onVocab(vocabulary, localVocabIndex);
            }}
            key={key}
            name={name}
            pinyin={json[key]['pinyin']}
            definition={json[key]['definition']}
            pos={json[key]['pos']}
          />
        );
        vocabIndex += 1;
      } else {
        DeckItems.push(
          <DeckItem
            pressHandler={ () => {
              this.props.onForward(key, name);
            }}
            key={key}
            name={name}
          />
        );
      }
    }
    return (
      <View style={{flex: 1}}>
        <ItemList style={{flex: 1}}>
          {DeckItems}
        </ItemList>
        <DeckFooter
          isHomePage={this.props.isHomePage}
          pageParentId={this.props.parentId}
          addDeckElementDisplay={this.addDeckElement.bind(this)}
          addLeafElementDisplay={this.addLeafElement.bind(this)}
        />
      </View>
    );
  }
}
