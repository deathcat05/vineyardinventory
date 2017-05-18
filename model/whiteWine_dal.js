var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback)
{
    var query = 'SELECT * FROM  WhiteWine;';

    connection.query(query, function(err, result)
    {
        callback(err, result);
    });
};

exports.getById = function(whiteBottleNumber, callback)
{
    var query = 'SELECT * FROM WhiteWine WHERE whiteBottleNumber = ?;';
    var queryData = [whiteBottleNumber];
    console.log(query);

    connection.query(query, queryData, function(err, result)
    {

        callback(err, result);
    });
};
