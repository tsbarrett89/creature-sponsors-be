const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const user = require('../user/userModel');
const org = require('../organization/organizationModel');
const router = express.Router();

router.post('/register/user', (req, res) => {
    const creds = req.body;

    if (creds.email && creds.password){
        const hash = bcrypt.hashSync(creds.password, 12);
        creds.password = hash;
        
        user.add(creds)
            .then(newUser => {
                const token = generateToken(newUser)
                console.log(token)

                res.status(201).json({ email: creds.email, token, user_id: newUser[0]});
            })
            .catch(error => {
                res.status(409).json({ errorMessage: `${creds.email} already exists`});
            })
    } else {
        res.status(400).json({ errorMessage: "Email and password are required to register."})
    }
})

module.exports = router;