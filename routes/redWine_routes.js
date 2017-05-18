var express = require('express');
var router = express.Router();
var redWine_dal = require('../model/redWine_dal');



// View All Addresses
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
    if(req.query.redBottleNumber == null)
    {
        res.send('We cannot seem to find that bottle in our inventory');
    }
    else {
        redWine_dal.getById(req.query.redBottleNumber, function(err,result)
        {
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
            res.render('redWine/redWineAdd');
        }
    });
});

// View the company for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.redBottleNumber == null)
    {
        res.send('There needs to be a bottle number ');
    }
    else if(req.query.redName == null)
    {
        res.send('A name must be provided');
    }
    else if(req.query.redYear == null)
    {
        res.send('We need to know the year of the wine');
    }
    else if(req.query.description == null)
    {
        res.send('We want to know all the dirty deets about this wine!');
    }

    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        redWine_dal.insert(req.query, function(err,result)
        {
            if (err)
            {
                console.log(err);
                res.send(err);
            }
            else
            {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/redWine/all');
            }
        });
    }
});

router.get('/edit', function(req, res)
{
    if(req.query.redBottleNumber == null)
    {
        res.send('We need to know which wine you would like to edit');
    }
    else
    {
        redWine_dal.edit(req.query.redBottleNumber, function(err, result)
        {
            res.render('redWine/redWineUpdate', {redWine: result[0][0]});
        });
    }

});

router.get('/update', function(req, res)
{
    redWine_dal.update(req.query, function(err, result)
    {
        res.redirect(302, '/redWine/all');
    });
});

// Delete a company for the given companyID
router.get('/delete', function(req, res){
    if(req.query.redBottleNumber == null) {
        res.send('We need to know which bottle you want to delete');
    }
    else {
        redWine_dal(req.query.redBottleNumber, function(err, result)
        {
            if(err)
            {
                res.send(err);
            }
            else
            {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/redWine/all');
            }
        });
    }
});

module.exports = router;