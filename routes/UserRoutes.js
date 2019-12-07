const express = require('express');
const bcrypt = require('bcrypt');
const gravater = require('gravatar')
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const secret = process.env.SECRET;

router.post('/register', (req, res)=>{

    const formData = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password,
        
    }

    const newUser = new User(formData);

    // Step 1. Generate a salt (random data for adding complexity)
    bcrypt.genSalt((err, salt)=>{
        if(err) {
            console.log('error is', err);
        }
        
        // Step 2. Generate a hashed password using (a) the user's password
        // and (b) the salt
        bcrypt.hash(
            newUser.password,
            salt,
            (err, hashedPassword)=>{
                if(err) {
                    console.log('error is', err);
                }
                
                // Step 3. Reassign the user's password to be hashed password
                newUser.password = hashedPassword;

                // Step 4. Saving the formData to the database

                newUser
                .save() // Promise

                // If promise is fulfilled
                .then( 
                    (newUserData)=>{
                        // Send response in the form of JSON
                        res.json(newUserData)
                    }
                )
                // Otherwise...
                .catch(
                    (err)=>{
                        console.log('error', err);
                    }
                )
            }
        )
    });
});

router.post('/login', (req, res)=>{

    const email = req.body.email;
    const password = req.body.password;

    User
    .findOne({ email: email }) //{}
    .then((theUser)=>{
        if(theUser) {
            
            bcrypt
            .compare(password, theUser.password)
            .then((isMatch)=>{

                console.log(isMatch)
                if(isMatch) {

                    const payload = {
                        id: theUser.id,
                        email: theUser.email
                    }

                    jwt.sign(
                        payload,
                        secret,
                        (err, theJWT)=>{
                            res.json({ token: theJWT,userid: theUser.id})
                        }
                    )

                } else {
                    res.json({ message: 'Wrong password' })
                }
            })
            .catch()


        } else {
            res.json({ message: "No user with this account exists" })
        }
    })
    .catch()

});
router.post('/follow', (req, res)=>{
    const UserA= req.user.id;
    const UserBemail= req.body.followedemail;
     UserModel
        .findOne({ email: UserBemail }) //{}
        .then((UserB)=>{
     if(UserB) {
       UserB.followers.push(UserA);
       UserA.following.push(UserB);
       Promise.all([UserB.save(),UserA.save()])
       .then(success=> res.json(success))
        .catch(err => res.status(404).json({ nofollowsaved: 'Unable to follower user' }));
     }
     else{
        res.json({ message: "Could not follow that user" });
     }
        }
        )})



module.exports = router;