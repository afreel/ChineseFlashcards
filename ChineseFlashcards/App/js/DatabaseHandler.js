import SQLite from 'react-native-sqlite-storage';

var DatabaseHandler = (function()  {
  var db_name = "mainDB";
  var db;
  var homeID = 1; // id of 'Home' db item, the root of our deck tree

  //SQLite.deleteDatabase({name : db_name, location : "~data/mainDB"});

  db = SQLite.openDatabase(
    {name : db_name, createFromLocation : "~data/mainDB"},
    () => console.log("SQL Database Opened"),
    (err) => console.log("SQL Error: " + err),
  );

  function executeSql (command) {
    return new Promise(function(resolve, reject) {
      db.transaction((tx) => {
        tx.executeSql(command, [], (tx, results) => {
           resolve(results);
        });
      });
    });
  }

  function closeDatabase() {
    db.close();
  }

  function insertDeck (name, parentId, isLeaf) {
    return executeSql('INSERT INTO deckitems (name, parent_id, leaf) VALUES (' +
      '"' + name + '"' + ',' +
      parentId + ',' +
      (isLeaf ? 1 : 0) +
    ');');
  }

  function removeDeck (deckId) {
    return executeSql(
      'WITH goodbye AS (' +
        'SELECT item_id, parent_id ' +
        'FROM deckitems ' +
        'WHERE item_id=' + deckId + ' ' +
        'UNION ALL ' +
        'SELECT c.item_id, c.parent_id ' +
        'FROM deckitems c ' +
          'JOIN goodbye p ON c.parent_id=p.item_id ' +
      ')' +
      'DELETE FROM deckitems ' +
      'WHERE item_id IN (SELECT item_id FROM goodbye);'
    );
  }

  function insertVocabulary (name, parentId, pinyin, definition, pos) {
    let deckPromise = insertDeck(name, parentId, true);
    let vocabPromise = executeSql('INSERT INTO vocabulary (word, pinyin, definition, pos) VALUES (' +
      '"' + name + '"' + ',' +
      '"' + pinyin + '"' + ',' +
      '"' + definition + '"' + ',' +
      '"' + pos + '"' +
    ');');
    return Promise.all([deckPromise, vocabPromise]);
  }

  function removeVocabulary (vocabId) {
    return executeSql('DELETE FROM vocabulary WHERE item_id=' + vocabId);
  }

  /**
   * Returns an Promise of the json representation of the Home page, which is
   * the highest level of the deck tree and should contain no leaves (characters)
   */
  function getInitialItems () {
    return executeSql('SELECT * FROM deckitems WHERE parent_id=' + homeID).then(function(results) {
      let len = results.rows.length;
      let items = {}
      for (let i = 0; i < len; i++) {
        let row = results.rows.item(i);
        // prevent character pages on the Home page for clarity
        items[row['item_id']] = {
          'name': row['name']
        }
      }
      return items;
    });
  }

  /**
   * Returns an Promise of an Object where:
   * key 'items' is thejson representation of the children of a DB id
   * key 'isLeafPage' is a boolean indicating if the page contains leaves
   */
  function getNextItems (parentId) {
    return executeSql('SELECT * FROM deckitems WHERE parent_id=' + parentId).then(function(results) {
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
      // If there are no leaves, return a Promiese for the items
      if (!isLeafPage) {
        return new Promise(function(resolve, reject) {
          resolve({items: items, isLeafPage: false});
        });
      // If our page contains a leaf (character), then we want to
      // query for character attributes in the 'vocabulary' table
      } else {
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
        return executeSql('SELECT * FROM vocabulary WHERE word IN ' + leafWordsString).then(function(results) {
          let leafItemsLen = results.rows.length;
          let leafItems = {};
          for (let i = 0; i < leafItemsLen; i++) {
            let row = results.rows.item(i);
            let leafKey = leafWordsToIds[row['word']];
            items[leafKey]['pinyin'] = row['pinyin'];
            items[leafKey]['definition'] = row['definition'];
            items[leafKey]['pos'] = row['pos'];
          }
          return {items: items, isLeafPage: true};
        });
      }
    }).then(function(results) {
      return results;
    });
  }

  return {
    getDatabase: function() {
      return db;
    },
    getInitialItems: function () {
      return getInitialItems();
    },
    getNextItems: function(parentId) {
      return getNextItems(parentId);
    },
    insertDeck: function(name, parentId, isLeaf) {
      return insertDeck(name, parentId, isLeaf);
    },
    removeDeck: function(deckId) {
      return removeDeck(deckId);
    },
    insertVocabulary: function(name, parentId, pinyin, definition, pos) {
      return insertVocabulary(name, parentId, pinyin, definition, pos);
    },
    removeVocabulary: function(vocabId) {
      return removeVocabulary(vocabId);
    }
  }

})();

export default DatabaseHandler;
