var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback)
{
    var query = 'SELECT * FROM RedWine;';

    connection.query(query, function(err, result)
    {
        callback(err, result);
    });
};

/* VIEW USED:

 CREATE OR REPLACE VIEW skillView AS
 SELECT s.* from skill s;
 */

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

exports.insert = function(params, callback)
{
    var query = 'INSERT INTO RedWine (redName, redYear, numberRedAvail, description) VALUES (?, ?, ?, ?);';
    var queryData = [params.redName, params.redYear, params.numberRedAvail, params.description, params.redBottleNumber];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};

exports.update = function(params, callback)
{
    var query = 'UPDATE RedWine SET redName = ? , redYear = ?, numberRedAvail = ?,  description = ? WHERE redBottleNumber = ?;';
    var queryData =[params.redName, params.redYear, params.numberRedAvail,  params.description, params.redBottleNumber];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};

exports.delete = function(redBottleNumber, callback)
{
    var query = 'DELETE FROM RedWine WHERE redBottleNumber = ?;';
    var queryData = [redBottleNumber];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};
exports.edit = function(redBottleNumber, callback)
{
    var query = 'CALL redWineGetInfo(?);';
    var queryData = [redBottleNumber];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};