const express = require('express');
const router = express.Router();
const Feed = require('../models/Company')


router.post('/', (req, res)=>{ // /feed/...
    const formData = {
        companyName: req.body.companyName,
        numberOfEmp: req.body.numberOfEmp,
        location: req.body.location,
        website: req.body.website,
        contact: req.body.contact,
        logo: req.body.logo,
        
    }

    const newFeed = new Feed(formData);

    newFeed
    .save()
    .then(newFeedData=>{
        res.json(newFeedData);
    })
    .catch(err=>{
        res.json(err)
    });

});

module.exports = router;