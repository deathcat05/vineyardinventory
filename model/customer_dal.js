var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback)
{
    var query = 'SELECT * FROM  Customer;';

    connection.query(query, function(err, result)
    {
        callback(err, result);
    });
};

exports.getById = function(customerNumber, callback)
{
    var query = 'SELECT * FROM Customer WHERE customerNumber = ?;';
    var queryData = [customerNumber];
    console.log(query);

    connection.query(query, queryData, function(err, result)
    {

        callback(err, result);
    });
};
