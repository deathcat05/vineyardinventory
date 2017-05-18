var express = require('express');
var router = express.Router();
var whiteWine_dal = require('../model/whiteWine_dal');

// View All companys
router.get('/all', function(req, res) {
    whiteWine_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('whiteWine/whiteWineViewAll', { 'result':result });
        }
    });

});

// View the company for the given id
router.get('/', function(req, res){
    if(req.query.whiteBottleNumber == null) {
        res.send('Sorry, but there is not a bottle with that number *sad panda*');
    }
    else {
        whiteWine_dal.getById(req.query.whiteBottleNumber, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('whiteWine/whiteWineViewByID', {'result': result});
            }
        });
    }
});

// Return the add a new company form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    whiteWiine_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('whiteWine/whiteWineAdd', {'address': result});
        }
    });
});

// View the company for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.whiteBottleNumber == null) {
        res.send('I cannot add to your inventory, unless you provide a number (:' );
    }
    else
        {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        whiteWine_dal.insert(req.query, function(err,result)
        {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/whiteWine/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.whiteWineBottleNumber == null) {
        res.send('In order to edit, we need to know a bottle number ');
    }
    else {
        whiteWine_dal.edit(req.query.whiteBottleNumber, function(err, result){
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
    whiteWine_dal.update(req.query, function(err, result){
        res.redirect(302, '/company/all');
    });
});

// Delete a company for the given company_id
router.get('/delete', function(req, res){
    if(req.query.whiteBottleNumber == null) {
        res.send('The bottle number does not exist ');
    }
    else {
        whiteWine_dal.delete(req.query.whiteBottleNumber, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/whiteWine/all');
            }
        });
    }
});

module.exports = router;