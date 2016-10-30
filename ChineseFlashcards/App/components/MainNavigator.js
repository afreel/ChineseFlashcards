import React, { Component } from 'react';
import { Navigator } from 'react-native';

import DeckNavigator from './DeckNavigator.js';
import VocabNavigator from './VocabNavigator.js';

export default class MainNavigator extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'Deck'}}

        renderScene={ (route, navigator) => {
          if (route.name == 'Deck') {
            return <DeckNavigator mainNavigator={navigator} />
          } else if (route.name == 'Vocab') {
            return <VocabNavigator
              mainNavigator={navigator}
              vocabulary={route.vocabulary}
              vocabIndex={route.vocabIndex}
            />
          }
        }}

        configureScene={(route, routeStack) => {
          if (route.name == 'Vocab') {
            return Navigator.SceneConfigs.FloatFromBottom
          }
        }}
      />
    )
  }

}
