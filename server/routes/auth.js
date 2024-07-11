const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res, next) => {

    const user = User()
});

module.exports = router;
