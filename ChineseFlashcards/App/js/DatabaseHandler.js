import SQLite from 'react-native-sqlite-storage';

var DatabaseHandler = (function()  {
  var db_name = "mainDB";
  var db;

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

  function getInitialItems () {
    return executeSql('SELECT * FROM deckitems WHERE parent_id=1').then(function(results) {
      let len = results.rows.length;
      let items = {}
      for (let i = 0; i < len; i++) {
        let row = results.rows.item(i);
        // prevent leaf pages on the Home page for clarity
        items[row['item_id']] = {
          'name': row['name']
        }
      }
      return items;
    });
  }

  return {
    getDatabase: function() {
      return db;
    },
    getInitialItems: function () {
      return getInitialItems();
    }
  }

})();

export default DatabaseHandler;
