var express = require('express');
var router = express.Router();
var shippingDept_dal = require('../model/shippingDept_dal');



// View All Addresses
router.get('/all', function(req, res) {
    shippingDept_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('shippingDept/shippingDeptViewAll', { 'result':result });
        }
    });

});

// View the company for the given id
router.get('/', function(req, res){
    if(req.query.orderNumber == null)
    {
        res.send('We cannot seem to find that order in our inventory');
    }
    else if(req.query.customerNumber == null)
    {
        res.send('We cannot find a customer with that number ')
    }
    else if(req.query.dateShipped == null)
    {
        res.send('We do not appear to have that shipping date anywhere in our system')
    }
    else {
        shippingDept_dal.getById(req.query.orderNumber, function(err,result)
        {
            if (err) {
                res.send(err);
            }
            else {
                res.render('shippingDept/shippingDeptViewByID', {'result': result});
            }
        });
    }
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
            //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
            res.redirect(302, '/shippingDept/shippingDeptAdd');
        }
    });
});

router.get('/edit', function(req, res)
{
   if(req.query.dateShippped == null)
    {
        res.send("We need to konw when it was shipped!")
    }
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
        res.redirect(302, '/shippingDept/all');
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
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/shippingDept/all');
            }
        });
    }
});

module.exports = router;