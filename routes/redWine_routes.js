/**
 * Created by deathcat05 on 5/17/2017.
 */
var express = require('express');
var router = express.Router();
var redWine_dal = require('../model/redWine_dal');

// View All companys
router.get('/all', function(req, res) {
    redWine_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('redWine/redWineViewAll', { 'result':result });
        }
    });

});

// View the company for the given id
router.get('/', function(req, res){
    if(req.query.redBottleNumber == null) {
        res.send('Sorry, but there is not a bottle with that number *sad panda*');
    }
    else {
        redWine_dal.getById(req.query.redBottleNumber, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('redWine/redWineViewByID', {'result': result});
            }
        });
    }
});

// Return the add a new company form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    redWine_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('redWine/redWineAdd', {'redWine': result});
        }
    });
});

// View the company for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.redBottleNumber == null) {
        res.send('I cannot add to your inventory, unless you provide a number (:' );
    }
    else
    {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        redWine_dal.insert(req.query, function(err,result)
        {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/redWine/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.redBottleNumber == null) {
        res.send('In order to edit, we need to know a bottle number ');
    }
    else {
        redWine_dal.edit(req.query.redBottleNumber, function(err, result){
            res.render('company/companyUpdate', {whiteWine: result[0][0]});
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
    redWine_dal.update(req.query, function(err, result){
        res.redirect(302, '/redWine/all');
    });
});

// Delete a company for the given company_id
router.get('/delete', function(req, res){
    if(req.query.redBottleNumber == null) {
        res.send('The bottle number does not exist ');
    }
    else {
        redWine_dal.delete(req.query.redBottleNumber, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/redWine/all');
            }
        });
    }
});

module.exports = router;