import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Modal
} from 'react-native';

import AppText from './AppText.js';
import BigButton from './BigButton.js';
import NewDeckForm from './NewDeckForm.js';
import NewVocabForm from './NewVocabForm.js';
import DatabaseHandler from '../js/DatabaseHandler.js';


export default class DeckFooter extends Component {

  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  addDeck(name, parentId, isLeaf) {
    DatabaseHandler.insertDeck(name, parentId, isLeaf).then(function(value) {
      console.log('inserted deck: ' + name);
      console.log('deck insert id: ' + value['insertId']);
      this.props.addDeckElementDisplay(value['insertId'], name);
    }.bind(this));
  }

  removeDeck(deckId) {
    DatabaseHandler.removeDeck(deckId).then(function() {
      console.log('removed deck with id: ' + deckId);
    });
  }

  addLeaf(name, parentId, pinyin, definition, pos) {
    DatabaseHandler.insertVocabulary(name, parentId, pinyin, definition, pos).then(function(values) {
      console.log('inserted vocabulary: ' + name);
      console.log('deck insert id: ' + values[0]['insertId']);
      console.log('vocab insert id: ' + values[1]['insertId']);
      this.props.addLeafElementDisplay(values[0]['insertId'], name, pinyin, definition, pos);
    }.bind(this));
  }

  removeLeaf() {
    DatabaseHandler.removeVocabulary(vocabId).then(function() {
      console.log('removed vocab with id: ' + vocabId);
    });
  }

  render() {
    let text;
    let pressHandler;
    let form;
    if (this.props.isLeafPage) {
      text = 'Add Card';
      pressHandler = function(vocabName, pinyin, definition, pos) {
        console.log('NEW VOCAB: ' + vocabName + ' with parentId ' + this.props.pageParentId);
        this.addLeaf(vocabName, this.props.pageParentId, pinyin, definition, pos);
      }.bind(this);
      form =
        <NewVocabForm
          closeHandler={this.setModalVisible.bind(this, false)}
          submitHandler={pressHandler}
        />;
    } else {
      text = this.props.isHomePage ? 'Add Deck' : 'Add Subdeck';
      pressHandler = function(deckName) {
        console.log('NEW DECK: ' + deckName + ' with parentId ' + this.props.pageParentId);
        this.addDeck(deckName, this.props.pageParentId, false);
      }.bind(this);
      form =
        <NewDeckForm
          closeHandler={this.setModalVisible.bind(this, false)}
          submitHandler={pressHandler}
          isHomePage={this.props.isHomePage}
        />;
    }
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            // update UI?
          }}
          >
          <View>
            {form}
          </View>
        </Modal>
        <BigButton
          style={styles.footerButton}
          onPress={this.setModalVisible.bind(this, true)}
        >
          {text}
        </BigButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerButton: {
    backgroundColor: '#BDC3C7'
  }
});
