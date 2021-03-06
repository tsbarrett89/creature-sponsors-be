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
                if(existing[0]){
                    res.status(409).json({ errorMessage: `User account for ${creds.email} already exists`});
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
            .catch(error => {
                res.status(500).json({ errorMessage: "Unable to verify if account already exists."})
            })
        
    } else {
        res.status(400).json({ errorMessage: "Email and password are required to register."})
    }
})

router.post('/register/org', (req, res) => {
    const creds = req.body

    if( creds.email && creds.password && creds.name && creds.location){
        org.findByEmail(creds.email)
            .then(existing => {
                if(existing[0]){
                    res.status(409).json({ errorMessage: `Organization with ${creds.email} already exists`})
                } else {
                    const hash = bcrypt.hashSync(creds.password, 12)
                    creds.password = hash

                    org.add(creds)
                        .then(newOrg => {
                            const token = generateToken(newOrg)

                            res.status(201).json({ email: creds.email, token, org_id: newOrg[0]})
                        })
                        .catch(error => {
                            res.status(500).json({ errorMessage: "Unable to register organization." })
                        })
                }
            })
    } else {
        res.status(400).json({ errorMessage: "Email, password, name, and location required to register"})
    }
})

router.post('login/user', (req, res) => {
    const { email, password } = req.body

    if( creds.email && creds.password ){
        user.findByEmail(email)
            .first()
            .then(account => {
                if( account && bcrypt.compareSync(password, account.password)){
                    const token = generateToken(account.id)
                    res.status(200).json({ email: account.email, token, id: account.id})
                } else {
                    res.status(401).json({ errorMessage: "Invalid credentials."})
                }
            })
            .catch()
    } else {
        res.status(400).json({ errorMessage: "Email and password required to login."})
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