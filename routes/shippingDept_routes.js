var express = require('express');
var router = express.Router();
var shippingDept_dal = require('../model/shippingDept_dal');



// View All Addresses
router.get('/all', function(req, res) {
    shippingDept_dal.getAll(function(err, result)
    {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.render('shippingDept/shippingDeptViewAll',
                {
                    'result': result, recentChange: req.query.recentChange, getOrders: req.query.getOrders
                });
        }
    });

});

// View the company for the given id
router.get('/', function(req, res)
{
        shippingDept_dal.getById(req.query.orderNumber, function(err,result)
        {
            if (err) {
                res.send(err);
            }
            else {
                res.render('shippingDept/shippingDeptViewByID', {'result': result, recentChange: req.query.recentChange});
            }
        });
});

// Return the add a new company form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    shippingDept_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('shippingDept/shippingDeptAdd');
        }
    });
});

// View the company for the given id
router.get('/insert', function(req, res)
{// passing all the query parameters (req.query) to the insert function instead of each individually
    shippingDept_dal.insert(req.query, function(err,result)
    {
        if (err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            var change = "Order " + req.query.orderNumber + " Added";
            res.redirect(302, '/shippingDept/all?recentChange=' + change);
        }
    });
});

router.get('/edit', function(req, res)
{
    {
        shippingDept_dal.edit(req.query.orderNumber, function(err, result)
        {
            res.render('shippingDept/shippingDeptUpdate', {shippingDept: result[0][0]});
        });
    }

});

router.get('/update', function(req, res)
{
    shippingDept_dal.update(req.query, function(err, result)
    {
        var change = "Order " + req.query.orderNumber + " Updated";
        res.redirect(302, '/shippingDept/all?recentChange=' + change);
});
});

// Delete a company for the given companyID
router.get('/delete', function(req, res){
    if(req.query.orderNumber == null) {
        res.send('We need to know which order you want to delete');
    }
    else {
        shippingDept_dal.delete(req.query.orderNumber, function(err, result)
        {
            if(err)
            {
                res.send(err);
            }
            else
            {
                var change = "Order " + req.query.firstName + " Sent (unless you archieved without sending!)";
                res.redirect(302, '/shippingDept/all?recentChange=' + change);
            }
        });
    }
});

module.exports = router;