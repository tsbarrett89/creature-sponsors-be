const bcryptjs = require('bcryptjs');
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
                
            })
    } else {
        res.status(400).json({ errorMessage: "Email and password are required to register."})
    }
})