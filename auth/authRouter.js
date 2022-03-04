const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const user = require('../user/userModel');
const org = require('../organization/organizationModel');
const router = express.Router();

router.post('/register/user', (req, res) => {
    const creds = req.body;

    if (creds.email && creds.password){
        user.findByEmail(creds.email)
            .then(existing => {
                console.log(existing)
                if(existing[0]){
                    res.status(409).json({ errorMessage: `${creds.email} already exists`});
                } else {
                    const hash = bcrypt.hashSync(creds.password, 12);
                    creds.password = hash;
                
                    user.add(creds)
                        .then(newUser => {
                            const token = generateToken(newUser)
            
                            res.status(201).json({ email: creds.email, token, user_id: newUser[0]});
                        })
                        .catch(error => {
                            res.status(500).json({ errorMessage: 'Unable to register user.'});
                        })
                    }
                
            })
                
            .catch()
        
    } else {
        res.status(400).json({ errorMessage: "Email and password are required to register."})
    }
})

function generateToken(id){
    const payload = {
        subject: id,
    };
    const secret = 'Secret sauce';
    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secret, options)
}

module.exports = router;