var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback)
{
    var query = 'SELECT * FROM  RedWine;';

    connection.query(query, function(err, result)
    {
        callback(err, result);
    });
};

exports.getById = function(redBottleNumber, callback)
{
    var query = 'SELECT * FROM RedWine WHERE redBottleNumber = ?;';
    var queryData = [redBottleNumber];
    console.log(query);

    connection.query(query, queryData, function(err, result)
    {

        callback(err, result);
    });
};
