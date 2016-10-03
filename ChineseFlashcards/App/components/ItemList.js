import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class ItemList extends Component {
  render() {
    return (
      <ScrollView>
        {this.props.children}
      </ScrollView>
    );
  }
}