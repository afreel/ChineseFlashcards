import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import DeckNavigator from '../components/DeckNavigator.js';

export default class App extends Component {
  render() {
    return (
      <DeckNavigator />
    );
  }
}