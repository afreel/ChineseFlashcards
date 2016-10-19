import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import AppText from './AppText.js';
import BigButton from './BigButton.js';

import PinyinConverter from '../js/PinyinConverter.js';

export default class NewDeckForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      vocabName: null,
      pinyin: null,
      definition: null,
      pos: null
    };
  }

  showError() {
    this.setState({showError: true});
  }

  closeForm() {
    this.props.closeHandler();
  }

  submitForm() {
    if (this.state.vocabName && this.state.pinyin && this.state.definition && this.state.pos) {
      console.log('Vocab: ' + this.state.vocabName);
      console.log('Pinyin: ' + this.state.pinyin);
      console.log('Definition: ' + this.state.definition);
      console.log('Pos: ' + this.state.pos);
      this.props.submitHandler(
        this.state.vocabName,
        this.state.pinyin,
        this.state.definition,
        this.state.pos
      );
      this.closeForm();
    } else {
      this.showError();
    }
  }

  render() {
    let errorMessage = null;
    if (this.state.showError) {
      errorMessage =
        <AppText style={{color: 'red'}}>
          *empty fields
        </AppText>;
    }
    return (
      <View style={styles.formView}>
        {errorMessage}

        <AppText style={styles.inputDescription}>
          Vocabulary Word
        </AppText>
        <TextInput
          style={styles.inputText}
          maxLength={20}
          onChangeText={(text) => this.setState({vocabName: text})}
          value={this.state.vocabName}
          autoCapitalize={'none'}
          placeholder={'你好'}
          placeholderTextColor={'lavender'}
          selectionColor={'#48C9B0'}
        />

        <AppText style={styles.inputDescription}>
          Pinyin
        </AppText>
        <TextInput
          style={styles.inputText}
          maxLength={32}
          onChangeText={(text) => this.setState({pinyin: PinyinConverter.convert(text)})}
          value={this.state.pinyin}
          autoCapitalize={'none'}
          placeholder={'ni3hao3'}
          placeholderTextColor={'lavender'}
        />

        <AppText style={styles.inputDescription}>
          Definition
        </AppText>
        <TextInput
          style={styles.inputText}
          maxLength={50}
          onChangeText={(text) => this.setState({definition: text})}
          value={this.state.definition}
          autoCapitalize={'none'}
          placeholder={'hello'}
          placeholderTextColor={'lavender'}
        />

        <AppText style={styles.inputDescription}>
          Part of Speech
        </AppText>
        <TextInput
          style={styles.inputText}
          maxLength={8}
          onChangeText={(text) => this.setState({pos: text})}
          value={this.state.pos}
          autoCapitalize={'none'}
          placeholder={'Noun'}
          placeholderTextColor={'lavender'}
        />

        <BigButton style={styles.formSubmitButton} onPress={this.submitForm.bind(this)}>
          Add Word
        </BigButton>
        <BigButton style={styles.formBackButton} onPress={this.closeForm.bind(this)}>
          Back
        </BigButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formSubmitButton: {
    backgroundColor: '#9B59B6',
    marginTop: 10,
  },
  formBackButton: {
    marginTop: 10,
  },
  inputText: {
    height: 40,
    padding: 5,
    borderColor: '#BDC3C7',
    borderWidth: 1,
    marginTop: 3,
  },
  inputDescription: {
    fontSize: 18,
    marginTop: 5,
  },
  formView: {
    margin: 30,
  }
});
