import React, { Component } from 'react';
import SQLite from 'react-native-sqlite-storage';
import {
  Navigator,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import DeckPage from './DeckPage.js';

var db_name = "chineseflashcardsDB";
var db;

db = SQLite.openDatabase(
  {name : db_name, createFromLocation : 1},
  () => console.log("SQL Database Opened"),
  (err) => console.log("SQL Error: " + err),
);

export default class DeckNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      readyToShow: false,
    };
  }

  getChildrenJson(parent_id) {
    this.setState({
      readyToShow: false,
    });
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM deckitems WHERE parent_id=' + parent_id, [], (tx, results) => {
          let len = results.rows.length;
          let items = {}
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            items[row['item_id']] = row['name'];
          }
          this.setState({
            items: items,
            readyToShow: true,
          });
        });
    });
  }

  componentDidMount() {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM deckitems WHERE parent_id=1', [], (tx, results) => {
          let len = results.rows.length;
          let items = {}
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            items[row['item_id']] = row['name'];
          }
          this.setState({
            items: items,
            readyToShow: true,
          });
        });
    });
  }

  render() {
    if (!this.state.readyToShow) {
      // TODO: if so inclined, add spinner or some other waiting screen
      return null;
    }
    return (
      <Navigator
        initialRoute={{header: "Home", depth: 0}}
        renderScene={(route, navigator) =>
          <DeckPage
            header={route.header}
            json={this.state.items}

            onForward={ (selectedId, selectedName) => {
              console.log('DEPTH: ' + route.depth);
              // this.getChildrenJson(selectedId);
              const nextDepth = route.depth + 1;
              const nextHeader = route.header + ' > ' + selectedName;
              navigator.push({
                header: nextHeader,
                depth: nextDepth,
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
                       <Text style={styles.text}>Back</Text>
                     </TouchableHighlight>
                   );
                 }
               },
               RightButton: (route, navigator, index, navState) =>
                 {
                   return (
                     <TouchableHighlight style={styles.addButton}>
                       <Text style={styles.text}>Add</Text>
                     </TouchableHighlight>
                   );
                 },
               Title: (route, navigator, index, navState) =>
                 { return (<Text style={styles.text}>{route.header}</Text>); },
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
  addButton: {
    paddingRight: 5,
  },
  scene: {
    paddingTop: 60,
  }
});
