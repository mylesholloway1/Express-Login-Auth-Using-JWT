const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route  POST /api/users
// @desc   register new user
// @access Public
router.post('/', [
    //name is required
    check('name', 'name is required').notEmpty(),
    //email must be valid
    check('email', 'email must be valid').isEmail(),
    //password must be at least 6 char
    check('password', 'password must be at least 6 characters').isLength({min:6})
], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {name, email, password} = req.body;

    try {
        //check if user exists
        let user = await User.findOne({email});
        if(user){
            res.status(400).json({errors:[{msg:'user already exists'}]});
        }

        //get gravatar
        const avatar = gravatar.url(email, {
            s:'200',
            r:'pg',
            d:'mm'
        });

        user = new User({
            name,
            email,
            password,
            avatar
        });

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        //save to db
        await user.save();

        res.status(200).send('user registered')
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
});

module.exports = router;