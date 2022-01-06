const bcryptjs = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const user = require('../user/userModel');
const org = require('../organization/organizationModel');
const router = express.Router();

