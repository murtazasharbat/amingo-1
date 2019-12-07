const express = require('express');
const router = express.Router();
const Feed = require('../models/Feed');
const User = require('../models/User');


router.post('/', async (req, res)=>{ // /feed/...
    const formData = {
        // username: req.body.username,
        comment: req.body.comment,
        // tags: req.body.tags,
        image: req.body.image
    }

    // Get the user's first name and last names 
    // Note: req.user.id is coming from passport
    const theUser = await User.findById(req.user.id);

    // Update the formData
    formData.username = theUser.firstName + ' ' + theUser.lastName;

    const newFeed = new Feed(formData);

    // Save the feed
    newFeed
    .save()
    .then(newFeedData=>{
        res.json(newFeedData);
    })
    .catch(err=>{
        res.json(err)
    });

});

router.post('/addlike', async (req, res)=>{
    
    let userLikes;

    // From body in fetch request
    let theFeedID = req.body.feedid; 

    // From the header in the fetch request (processed by passport)
    let userID = req.user.id; 

    // 1. Get the document with matching id
    let theDocument = await Feed
    .find({_id: theFeedID}) // promise
    .catch(err=>{
        res.send(err)
    })

    // 2. Extract the likes from the document
    userLikes = theDocument[0].likes;

    // 3. Push the new like to the array
    
    // If the user exists
    if(userLikes.includes(userID)) {
        userLikes.splice(
            userLikes.indexOf(userID), // position of userID in the array
            1 // number items we want to remove from the array
        );
    } else {
        userLikes.push(userID);
    }

    // 4. Update the document
    Feed
    .updateOne(
        {_id: theFeedID},
        {likes: userLikes}
    ) //promise
    .then(theFeed=>{
        res.json(theFeed)
    })
    .catch(err=>{
        res.json(err)
    });
});

module.exports = router;