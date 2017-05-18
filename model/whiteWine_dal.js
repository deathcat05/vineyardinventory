var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback)
{
    var query = 'SELECT * FROM WhiteWine;';

    connection.query(query, function(err, result)
    {
        callback(err, result);
    });
};

/* VIEW USED:

 CREATE OR REPLACE VIEW skillView AS
 SELECT s.* from skill s;
 */

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

exports.insert = function(params, callback)
{
    var query = 'INSERT INTO WhiteWine (whiteName, whiteYear, numberWhiteAvail, description) VALUES (?, ?, ?, ?);';
    var queryData = [params.whiteName, params.whiteYear, params.numberWhiteAvail, params.description, params.whiteBottleNumber];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};

exports.update = function(params, callback)
{
    var query = 'UPDATE WhiteWine SET whiteName = ? , whiteYear = ?, numberWhiteAvail = ?,  description = ? WHERE whiteBottleNumber = ?;';
    var queryData =[params.whiteName, params.whiteYear, params.numberWhiteAvail,  params.description, params.whiteBottleNumber];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};

exports.delete = function(whiteBottleNumber, callback)
{
    var query = 'DELETE FROM WhiteWine WHERE whiteBottleNumber = ?;';
    var queryData = [whiteBottleNumber];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};
exports.edit = function(whiteBottleNumber, callback)
{
    var query = 'CALL whiteWineGetInfo(?);';
    var queryData = [whiteBottleNumber];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};