const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// ---------------Edgar-------------------

const db = new sqlite3.Database(
    path.resolve(__dirname, '../TP1.db')
);

module.exports = db;