var mysql   = require('mysql');
var db  = require('../config/db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback)
{
    var query = 'SELECT * FROM BoughtWhite;';

    connection.query(query, function(err, result)
    {
        callback(err, result);
    });
};

/* VIEW USED:

 CREATE OR REPLACE VIEW skillView AS
 SELECT s.* from skill s;
 */

exports.getById = function(customerNumber, callback)
{
    var query = 'CREATE OR REPLACE VIEW totalWineBottlesCustomer AS '+
        'SELECT c.customerNumber, firstName, lastName, address, sd.orderNumber, ' +
    'bw.numberBottlesBought AS NumberOfWhiteBought FROM Customer c '+
    'JOIN BoughtWhite bw ON c.customerNumber = bw.customerNumber ' +
    'JOIN WhiteWine ww ON bw.whiteBottleNumber = ww.whiteBottleNumber ' +
    'JOIN ShippingDept sd ON c.customerNumber = sd.customerNumber ' +
    'GROUP BY c.customerNumber HAVING numberBottlesBought >= 3';
    var queryData = [customerNumber];
    console.log(query);

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};

exports.insert = function(params, callback)
{
    var query = 'INSERT INTO BoughtWhite (numberBottlesBought) VALUES (?);';
    var queryData = [params.numberBottlesBought, params.customerNumber];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};

exports.update = function(params, callback)
{
    var query = 'UPDATE BoughtWhite SET numberBottlesBought = ? WHERE customerNumber = ?;';
    var queryData =[params.numberBottlesBought,params.whiteBottleNumber, params.customerNumber];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};

exports.delete = function(customerNumber, callback)
{
    var query = 'DELETE FROM BoughtWhite WHERE customerNumber = ?;';
    var queryData = [customerNumber];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};
exports.edit = function(customerNumber, callback)
{
    var query = 'CALL boughtWhiteGetInfo(?);';
    var queryData = [customerNumber];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};