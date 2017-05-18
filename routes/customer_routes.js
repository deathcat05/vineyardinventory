var express = require('express');
var router = express.Router();
var customer_dal = require('../model/customer_dal');

// View All companys
router.get('/all', function(req, res) {
    customer_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('customer/customerViewAll', { 'result':result });
        }
    });

});

// View the company for the given id
router.get('/', function(req, res){
    if(req.query.customerNumber == null) {
        res.send('Sorry, but there is not a bottle with that number *sad panda*');
    }
    else {
        customer_dal.getById(req.query.customerNumber, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('customer/customerViewByID', {'result': result});
            }
        });
    }
});

// Return the add a new company form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    customer_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('customer/customerAdd', {'customer': result});
        }
    });
});

// View the company for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.customerNumber == null) {
        res.send('I cannot add to your inventory, unless you provide a number (:' );
    }
    else
    {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        customer_dal.insert(req.query, function(err,result)
        {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/customer/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.customerNumber == null) {
        res.send('In order to edit, we need to know a bottle number ');
    }
    else {
        customer_dal.edit(req.query.customerNumber, function(err, result)
        {
            res.render('customer/customerUpdate', {customer: result[0]});
        });
    }

});
/*
 router.get('/edit2', function(req, res){
 if(req.query.company_id == null) {
 res.send('A company id is required');
 }
 else {
 company_dal.getById(req.query.company_id, function(err, company){
 address_dal.getAll(function(err, address) {
 res.render('company/companyUpdate', {company: company[0], address: address});
 });
 });
 }

 });
 */

router.get('/update', function(req, res) {
    customer_dal.update(req.query, function(err, result){
        res.redirect(302, '/customer/all');
    });
});

// Delete a company for the given company_id
router.get('/delete', function(req, res){
    if(req.query.customerNumber == null) {
        res.send('The bottle number does not exist ');
    }
    else {
        customer_dal.delete(req.query.customerNumber, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/customer/all');
            }
        });
    }
});

module.exports = router;