import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

import AppText from './AppText.js';

export default class Button extends Component {
  state = {
    active: false,
  };

  _onHighlight = () => {
    this.setState({active: true});
  };

  _onUnhighlight = () => {
    this.setState({active: false});
  };

  render() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnhighlight}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles.button, this.props.style]}
        underlayColor="#a9d9d4">
          <Text style={[styles.buttonText, colorStyle]}>
            <AppText>{this.props.children}</AppText>
          </Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 50,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    color: '#F8F9F9',
    margin: 5,
    textAlign: 'center',
  }
});
