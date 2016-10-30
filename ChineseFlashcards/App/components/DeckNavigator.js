import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import DeckPage from './DeckPage.js';
import AppText from './AppText.js';

import DatabaseHandler from '../js/DatabaseHandler.js';

export default class DeckNavigator extends Component {
  // currently using state just for the first DB query so render has content...better way to do this?
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      readyToShow: false,
    };
  }

  componentDidMount() {
    // get the highest level decks
    var that = this;
    DatabaseHandler.getInitialItems().then(function(items) {
      that.setState({
        items: items,
        readyToShow: true,
      });
    });
  }

  render() {
    if (!this.state.readyToShow) {
      // TODO: if so inclined, add spinner or some other waiting screen
      return null;
    }
    var json = this.state.items;
    return (
      <Navigator
        initialRoute={{header: ['Home'], title: 'Home', depth: 0, json: json, isLeafPage: false, parentId: 1}}
        renderScene={(route, navigator) =>
          <DeckPage
            json={route.json}
            isHomePage={route.depth === 0}
            isLeafPage={route.isLeafPage}
            parentId={route.parentId}

            onVocab={ (vocabulary, vocabIndex) => {
              this.props.mainNavigator.push({name: 'Vocab', vocabulary: vocabulary, vocabIndex: vocabIndex});
            }}

            onForward={ (selectedId, selectedName) => {
              const nextDepth = route.depth + 1;
              const nextHeader = route.header.concat([selectedName]);
              const nextTitle = trimHeader(nextHeader);
              console.log('clicked id: ' + selectedId);
              // get children of the selected deck, then push them to navigator
              DatabaseHandler.getNextItems(selectedId).then(function(results) {
                navigator.push({
                  header: nextHeader,
                  title: nextTitle,
                  depth: nextDepth,
                  json: results.items,
                  isLeafPage: results.isLeafPage,
                  parentId: selectedId,
                });
              });

            }}

            onBack={ () => {
              if (route.depth > 0) {
                navigator.pop();
              }
            }}
          />
        }
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) =>
                {
                  if (route.depth === 0) {
                    return null;
                  } else {
                    return (
                      <TouchableHighlight style={styles.backButton} onPress={() => navigator.pop()}>
                        <View>
                          <AppText style={styles.text}>Back</AppText>
                        </View>
                      </TouchableHighlight>
                    );
                  }
                },
              RightButton: (route, navigator, index, navState) =>
                {
                  return (
                    <TouchableHighlight style={styles.editButton}>
                      <View>
                        <AppText style={styles.text}>Edit</AppText>
                      </View>
                    </TouchableHighlight>
                  );
                },
              Title: (route, navigator, index, navState) =>
                {
                  return (
                    <AppText style={styles.text}>{route.title}</AppText>
                  );
                },
            }}
            style={styles.header}
          />
        }
        configureScene={(route, routeStack) => ({
          ...Navigator.SceneConfigs.HorizontalSwipeJump,
          gestures: false
        })}
        sceneStyle={styles.scene}
      />
    );
  }
}

trimHeader = function(title) {
  let titleRev = title.slice().reverse();
  let maxLen = 18; // this value controls how wide the header can get
  var currLen = 0;
  let i = 0;
  let broken = false;
  while (i < titleRev.length) {
  	currLen += titleRev[i].length;
    if (currLen > maxLen) {
    	broken = true;
    	break;
    }
    i++;
  }
  let displayables = title.slice().splice(-1 * i - 1);
  var display = '';
  if (broken) {
  	display += '...';
  } else {
  	display += displayables[0];
  }
  for (let d = 1; d < displayables.length; d++) {
  	display += ' > ';
    display += displayables[d];
  }
  return display;
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#9B59B6', // purple
  },
  text: {
    color: '#F8F9F9', // white-grey
    marginTop: 15,
  },
  backButton: {
    paddingLeft: 10,
  },
  editButton: {
    paddingRight: 10,
  },
  scene: {
    paddingTop: 63,
  }
});
