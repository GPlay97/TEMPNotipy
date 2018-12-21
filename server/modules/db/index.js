/**
 * @file /server/modules/db/index.js
 * @author GPlay97
 * @description Module for database as a wrapper to make query easy
 */
const mysql = require('mysql');
const config = require('../../config.json');
const db = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PWD,
    database: config.DB_NAME
});

/**
 * Queries the database for given sql query and prepares the query to dynamically bind the values
 * @param {String} sql the sql query to execute
 * @param {Array} params array with values to insert in sql query
 * @param {Function} callback callback function
 */
const query = (sql, params, callback) => {
    if (!Array.isArray(params)) params = [];
    if (typeof sql !== 'string') return callback('Wrong query format');
    // execute query and bind to params
    db.query(mysql.format(sql, params), (err, queryRes) => callback(err, queryRes));
};

module.exports = {
    query
};