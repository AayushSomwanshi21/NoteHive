const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "thisismyserver";
router.post('/createuser', [

    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('password', 'Password must be of min len 5').isLength({ min: 5 }),
    body('email', "Enter a valid Email").isEmail()

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "User with this email already exists" });
        }
        const salt = await bycrypt.genSalt(10);
        const secPass = await bycrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id,
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken);
        res.json({ authtoken: authtoken }); //{authtoken}
        //res.json(user);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }

}
);
module.exports = router;
