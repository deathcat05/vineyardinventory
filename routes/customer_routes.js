var express = require('express');
var router = express.Router();
var customer_dal = require('../model/customer_dal');



// View All Addresses
router.get('/all', function(req, res) {
    customer_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('customer/customerViewAll', { 'result':result, recentChange: req.query.recentChange });
        }
    });

});

// View the company for the given id
router.get('/', function(req, res){
    if(req.query.customerNumber == null)
    {
        res.send('We do not seem to have a person by that number');
    }
    else {
        customer_dal.getById(req.query.customerNumber, function(err,result)
        {
            if (err) {
                res.send(err);
            }
            else {
                res.render('customer/customerViewByID', {'result': result, recentChange: req.query.recentChange});
            }
        });
    }
});

// Return the add a new company form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    customer_dal.getAll(function(err,result)
    {
        if (err) {
            res.send(err);
        }
        else {
            res.render('customer/customerAdd');
        }
    });
});

// View the company for the given id
router.get('/insert', function(req, res){
    // simple validation
   {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        customer_dal.insert(req.query, function(err,result)
        {
            if (err)
            {
                console.log(err);
                res.send(err);
            }
            else
            {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                var change = req.query.firstName + " Added";
                res.redirect(302, '/customer/all?recentChange=' + change);
            }
        });
    }
});

router.get('/edit', function(req, res)
{
    if(req.query.customerNumber == null)
    {
        res.send('We need to know which customer you would like to edit');
    }
    else
    {
        customer_dal.edit(req.query.customerNumber, function(err, result)
        {
            res.render('customer/customerUpdate', {customer: result[0][0]});
        });
    }

});

router.get('/update', function(req, res)
{
    customer_dal.update(req.query, function(err, result)
    {
        var change = req.query.firstName + " Updated";
        res.redirect(302, '/customer/all?recentChange=' + change);
    });
});

// Delete a company for the given companyID
router.get('/delete', function(req, res){
    if(req.query.customerNumber == null) {
        res.send('We need to know which customer you want to delete');
    }
    else {
        customer_dal.delete(req.query.customerNumber, function(err, result)
        {
            if(err)
            {
                res.send(err);
            }
            else
            {
                res.redirect(302, '/customer/all');
            }
        });
    }
});

module.exports = router;