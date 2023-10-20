const mysql = require('mysql2');
const config = require('./config');

const dbConfig = config.dbConfig;

// Create a connection pool using mysql2
const dbConnection = mysql.createPool(dbConfig);

// Use the promise method for queries
dbConnection.promise = dbConnection.promise.bind(dbConnection);

// Export the dbConnection object
module.exports = dbConnection;