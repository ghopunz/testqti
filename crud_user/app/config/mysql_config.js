'use strict';

let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'coba_user'
});

connection.connect();

module.exports = connection;