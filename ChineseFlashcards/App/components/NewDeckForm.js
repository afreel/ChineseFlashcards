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
      deckName: null,
    };
  }

  showError() {
    this.setState({showError: true});
  }

  closeForm() {
    this.props.closeHandler();
  }

  submitForm() {
    if (this.state.deckName) {
      this.props.submitHandler(this.state.deckName);
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
          {this.props.isHomePage ? 'Deck Name' : 'Subdeck Name'}
        </AppText>
        <TextInput
          style={styles.inputText}
          maxLength={20}
          onChangeText={(text) => this.setState({deckName: text})}
          value={this.state.deckName}
        />
        <BigButton style={styles.formSubmitButton} onPress={this.submitForm.bind(this)}>
          {this.props.isHomePage ? 'Add Deck' : 'Add Subdeck'}
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
