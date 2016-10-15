import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import AppText from './AppText.js';
import BigButton from './BigButton.js';

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
        />

        <AppText style={styles.inputDescription}>
          Pinyin
        </AppText>
        <TextInput
          style={styles.inputText}
          maxLength={32}
          onChangeText={(text) => this.setState({pinyin: text})}
          value={this.state.pinyin}
        />

        <AppText style={styles.inputDescription}>
          Definition
        </AppText>
        <TextInput
          style={styles.inputText}
          maxLength={50}
          onChangeText={(text) => this.setState({definition: text})}
          value={this.state.definition}
        />

        <AppText style={styles.inputDescription}>
          Part of Speech
        </AppText>
        <TextInput
          style={styles.inputText}
          maxLength={8}
          onChangeText={(text) => this.setState({pos: text})}
          value={this.state.pos}
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
    marginTop: 10,
  },
  inputDescription: {
    fontSize: 18,
  },
  formView: {
    margin: 30,
  }
});
