var express = require('express');
var router = express.Router();
var boughtWhite_dal = require('../model/boughtWhite_dal');



// View All Addresses
router.get('/all', function(req, res) {
    boughtWhite_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('boughtWhite/boughtWhiteViewAll', { 'result':result });
        }
    });

});

// View the company for the given id
router.get('/', function(req, res){
    if(req.query.whiteBottleNumber == null)
    {
        res.send('We cannot seem to find that bottle in our inventory');
    }
    else if(req.query.customerNumber == null)
    {
        res.send('We cannot find a customer with that number ')
    }
    else {
        boughtWhite_dal.getById(req.query.customerNumber, function(err,result)
        {
            if (err) {
                res.send(err);
            }
            else {
                res.render('boughtWhite/boughtWhiteViewByID', {'result': result});
            }
        });
    }
});

// Return the add a new company form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    boughtWhite_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('boughtWhite/boughtWhiteAdd');
        }
    });
});

// View the company for the given id
router.get('/insert', function(req, res)
{// passing all the query parameters (req.query) to the insert function instead of each individually
boughtWhite_dal.insert(req.query, function(err,result)
        {
            if (err)
            {
                console.log(err);
                res.send(err);
            }
            else
            {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/boughtWhite/boughtWhiteAdd');
            }
        });
});

router.get('/edit', function(req, res)
{
    if(req.query.customerNumber == null)
    {
        res.send('We need to know which customer order you would like to edit');
    }
    else if(req.query.whiteBottleNumber == null)
    {
        res.send("We need to konw which wine they bought!")
    }
    {
        boughtWhite_dal.edit(req.query.customerNumber, function(err, result)
        {
            res.render('boughtWhite/boughtWhiteUpdate', {bougthWhite: result[0][0]});
        });
    }

});

router.get('/update', function(req, res)
{
    boughtWhite_dal.update(req.query, function(err, result)
    {
        res.redirect(302, '/boughtWhite/all');
    });
});

// Delete a company for the given companyID
router.get('/delete', function(req, res){
    if(req.query.customerNumber == null) {
        res.send('We need to know which bottle you want to delete');
    }
    else {
        boughtWhite_dal.delete(req.query.customerNumber, function(err, result)
        {
            if(err)
            {
                res.send(err);
            }
            else
            {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/boughtWhite/all');
            }
        });
    }
});

module.exports = router;