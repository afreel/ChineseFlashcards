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

var db = DatabaseHandler.getDatabase();

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
        initialRoute={{header: "Home", depth: 0, json: json, isLeafPage: false, parentID: 1}}
        renderScene={(route, navigator) =>
          <DeckPage
            header={route.header}
            json={route.json}
            isHomePage={route.depth === 0}
            isLeafPage={route.isLeafPage}
            parentID={route.parentID}

            onForward={ (selectedId, selectedName) => {
              const nextDepth = route.depth + 1;
              const nextHeader = route.header + ' > ' + selectedName;
              // get children of the selected deck, then push them to navigator
              db.transaction((tx) => {
                tx.executeSql('SELECT * FROM deckitems WHERE parent_id=' + selectedId, [], (tx, results) => {
                  let deckItemsLen = results.rows.length;
                  let items = {}
                  let isLeafPage = false;
                  let leafWordsToIds = {};
                  for (let i = 0; i < deckItemsLen; i++) {
                    let row = results.rows.item(i);
                    if (row['leaf']) {
                      isLeafPage = true;
                      leafWordsToIds[row['name']] = row['item_id'];
                    }
                    items[row['item_id']] = {
                      'name': row['name'],
                      'isLeaf': row['leaf']
                    }
                  }
                  // If our page contains a leaf (character), then we want to
                  // query for character attributes in the 'vocabulary' table
                  if (isLeafPage) {
                    let leafWordsLen = Object.keys(leafWordsToIds).length;
                    let leafWordsString = "(";
                    let leavesAdded = 0;
                    for (let leafWord in leafWordsToIds) {
                      leafWordsString += "'";
                      leafWordsString += leafWord;
                      leafWordsString += "'";
                      if (leavesAdded < leafWordsLen - 1) {
                        leafWordsString += ",";
                      }
                      leavesAdded += 1;
                    }
                    leafWordsString += ")";
                    db.transaction((tx) => {
                      tx.executeSql('SELECT * FROM vocabulary WHERE word IN ' + leafWordsString, [], (tx, results) => {
                        let leafItemsLen = results.rows.length;
                        let leafItems = {};
                        for (let i = 0; i < leafItemsLen; i++) {
                          let row = results.rows.item(i);
                          let leafKey = leafWordsToIds[row['word']];
                          items[leafKey]['pinyin'] = row['pinyin'];
                          items[leafKey]['definition'] = row['definition'];
                          items[leafKey]['pos'] = row['pos'];
                        }
                        navigator.push({
                          header: nextHeader,
                          depth: nextDepth,
                          json: items,
                          isLeafPage: true,
                          parentID: selectedId,
                        });
                      });
                    });
                  }
                  // otherwise the push happens after the second DB call
                  if (!isLeafPage) {
                    navigator.push({
                      header: nextHeader,
                      depth: nextDepth,
                      json: items,
                      isLeafPage: false,
                      parentID: selectedId,
                    });
                  }
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
                       <Text style={styles.text}>
                         <AppText>Back</AppText>
                       </Text>
                     </TouchableHighlight>
                   );
                 }
               },
               RightButton: (route, navigator, index, navState) =>
                 {
                   return (
                     <TouchableHighlight style={styles.editButton}>
                     <Text style={styles.text}>
                       <AppText>Edit</AppText>
                     </Text>
                     </TouchableHighlight>
                   );
                 },
               Title: (route, navigator, index, navState) =>
                 {
                   return (
                   <Text style={styles.text}>
                     <AppText>{route.header}</AppText>
                   </Text>
                   );
                 },
             }}
             style={styles.header}
           />
        }
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.HorizontalSwipeJump
        }
        sceneStyle={styles.scene}
      />
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#9B59B6',
  },
  text: {
    color: '#F8F9F9',
    paddingTop: 15,
  },
  backButton: {
    paddingLeft: 5,
  },
  editButton: {
    paddingRight: 5,
  },
  scene: {
    paddingTop: 63,
  }
});
