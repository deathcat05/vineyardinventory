var mysql   = require('mysql');
var db  = require('../config/db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback)
{
    var query = 'SELECT * FROM Customer;';

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

exports.insert = function(params, callback)
{
    var query = 'INSERT INTO Customer (firstName, lastName, address, isMember) VALUES (?, ?, ?, ?);';
    var queryData = [params.firstName, params.lastName, params.address, params.isMember, params.customerNumber];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};

exports.update = function(params, callback)
{
    var query = 'UPDATE Customer SET firstName = ? , lastName = ?, address = ?,  isMember = ? WHERE customerNumber = ?;';
    var queryData =[params.firstName, params.lastName, params.address,  params.isMember, params.customerNumber];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};

exports.delete = function(customerNumber, callback)
{
    var query = 'DELETE FROM Customer WHERE customerNumber = ?;';
    var queryData = [customerNumber];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};
exports.edit = function(customerNumber, callback)
{
    var query = 'CALL getCustomerInfo(?);';
    var queryData = [customerNumber];

    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};