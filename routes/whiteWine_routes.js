var express = require('express');
var router = express.Router();
var whiteWine_dal = require('../model/whiteWine_dal');



// View All Addresses
router.get('/all', function(req, res) {
    whiteWine_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('whiteWine/whiteWineViewAll', {'result': result, recentChange: req.query.recentChange});
        }
    });

});

// View the company for the given id
router.get('/', function(req, res){
    if(req.query.whiteBottleNumber == null)
    {
        res.send('We cannot seem to find that bottle in our inventory');
    }
    else {
        whiteWine_dal.getById(req.query.whiteBottleNumber, function(err,result)
        {
            if (err)
            {
                res.send(err);
            }
            else
                {
                res.render('whiteWine/whiteWineViewByID', {'result': result, recentChange: req.query.recentChange});
            }
        });
    }
});

// Return the add a new company form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    whiteWine_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('whiteWine/whiteWineAdd');
        }
    });
});

// View the company for the given id
router.get('/insert', function(req, res)
{
    // simple validation
    if(req.query.whiteName == null)
    {
        res.send('A name must be provided');
    }
    else if(req.query.whiteYear == null)
    {
        res.send('We need to know the year of the wine');
    }
    else if(req.query.description == null)
    {
        res.send('We want to know all the dirty deets about this wine!');
    }

    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        whiteWine_dal.insert(req.query, function(err,result)
        {
            if (err)
            {
                console.log(err);
                res.send(err);
            }
            else
            {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                var change = req.query.whiteName + " Added";
                res.redirect(302, '/whiteWine/all?recentChange=' + change);
            }
        });
    }
});

router.get('/edit', function(req, res)
{
    if(req.query.whiteBottleNumber == null)
    {
        res.send('We need to know which wine you would like to edit');
    }
    else
    {
        whiteWine_dal.edit(req.query.whiteBottleNumber, function(err, result)
        {
            res.render('whiteWine/whiteWineUpdate', {whiteWine: result[0][0]});
        });
    }

});

router.get('/update', function(req, res)
{
    whiteWine_dal.update(req.query, function(err, result)
    {
        var change = req.query.whiteName + " Updated";
        res.redirect(302, '/whiteWine/all?recentChange=' + change);
    });
});

// Delete a company for the given companyID
router.get('/delete', function(req, res){
    if(req.query.whiteBottleNumber == null) {
        res.send('We need to know which bottle you want to delete');
    }
    else
        {
        whiteWine_dal.delete(req.query.whiteBottleNumber, function(err, result)
        {
            if(err)
            {
                res.send(err);
            }
            else
            {
                //poor practice, but we will handle it differently once we start using Ajax
                var change = req.query.whiteName + " Deleted";
                res.redirect(302, '/whiteWine/all?recentChange=' + change);
            }
        });
    }
});

module.exports = router;