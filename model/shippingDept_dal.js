var mysql   = require('mysql');
var db  = require('../config/db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback)
{
    var query = 'SELECT * FROM ShippingDept;';

    connection.query(query, function(err, result)
    {
        callback(err, result);
    });
};
exports.getOrders = function(params, callback)
{
    var query = 'SELECT * FROM totalWineBottlesCustomer;';
    var queryData = [params.customerNumber, params.firstName, params.lastName, params.numberBottlesBought, params.whiteBottleNumber];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });

};
exports.getById = function(orderNumber, callback)
{
    var query = 'SELECT * FROM ShippingDept WHERE orderNumber = ?;';
    var queryData = [orderNumber];
    console.log(query);

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};

exports.insert = function(params, callback)
{
    var query = 'INSERT INTO ShippingDept (dateShipped) VALUES (?);';
    var queryData = [params.dateShipped, params.orderNumber, params.customerNumber];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};

exports.update = function(params, callback)
{
    var query = 'UPDATE ShippingDept SET dateShipped = ? WHERE orderNumber = ?, customerNumber = ?;';
    var queryData =[params.dateShipped, params.orderNumber, params.customerNumber];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};

exports.delete = function(orderNumber, callback)
{
    var query = 'DELETE FROM ShippingDept WHERE orderNumber = ?;';
    var queryData = [orderNumber];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};
exports.edit = function(orderNumber, callback)
{
    var query = 'CALL orderGetInfo(?);';
    var queryData = [orderNumber];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};