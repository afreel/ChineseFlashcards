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
    this.state = {
      newDeckModalVisible: false,
      newVocabModalVisible: false
    };
  }

  setNewDeckModalVisible(visible) {
    this.setState({newDeckModalVisible: visible});
  }

  setNewVocabModalVisible(visible) {
    this.setState({newVocabModalVisible: visible});
  }

  hideModals() {
    this.setState({
      newDeckModalVisible: false,
      newVocabModalVisible: false
    });
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
    let addDeckPressHandler;
    let addDeckForm;
    let addDeckFooterButton;

    let addVocabPressHandler;
    let addVocabForm;
    let addVocabFooterButton;

    // ADD DECK COMPONENTS
    addDeckPressHandler = function(deckName) {
      console.log('NEW DECK: ' + deckName + ' with parentId ' + this.props.pageParentId);
      this.addDeck(deckName, this.props.pageParentId, false);
    }.bind(this);

    addDeckForm =
      <NewDeckForm
        closeHandler={this.setNewDeckModalVisible.bind(this, false)}
        submitHandler={addDeckPressHandler}
        isHomePage={this.props.isHomePage}
      />;

    addDeckFooterButton =
      <BigButton
        style={styles.footerButton}
        onPress={this.setNewDeckModalVisible.bind(this, true)}
        >
        {this.props.isHomePage ? 'Add Deck' : 'Add Subdeck'}
      </BigButton>;

    // ADD VOCAB COMPONENTS
    // home page can only add Decks, all over pages can add Subdecks or Vocab
    if (!this.props.isHomePage) {
      addVocabPressHandler = function(vocabName, pinyin, definition, pos) {
        console.log('NEW VOCAB: ' + vocabName + ' with parentId ' + this.props.pageParentId);
        this.addLeaf(vocabName, this.props.pageParentId, pinyin, definition, pos);
      }.bind(this);

      addVocabForm =
        <NewVocabForm
          closeHandler={this.setNewVocabModalVisible.bind(this, false)}
          submitHandler={addVocabPressHandler}
        />;

      addVocabFooterButton =
        <BigButton
          style={styles.footerButton}
          onPress={this.setNewVocabModalVisible.bind(this, true)}
          >
          {'Add Card'}
        </BigButton>;
    }

    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.newDeckModalVisible}
          >
          <View>
            {addDeckForm}
          </View>
        </Modal>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.newVocabModalVisible}
          >
          <View>
            {addVocabForm}
          </View>
        </Modal>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {addDeckFooterButton}
          {addVocabFooterButton}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerButton: {
    backgroundColor: '#BDC3C7'
  }
});
