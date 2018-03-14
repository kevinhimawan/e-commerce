const User = require('../model/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10
var uniqueValidator = require('mongoose-unique-validator')

module.exports = {
    createUser (req,res){
        const { username, email, password } = req.body
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(password, salt);
        const newUser = new User({
            username,email,password: hash
        })
        
        newUser.save((err,response)=>{
            if(err){
                res.status(409).json(err)
            }
            const token = jwt.sign({id:response._id,email:response.email},process.env.secret_key)
            res.status(200).json({
                token: token
            })
        })
    },
    getData(req,res){
        User.find()
        .exec()
        .then(userData=>{
            res.status(200).json(userData)
        })
    },
    loginUser(req,res) {
        User.findOne({$or: [
            {email: req.body.username_email},
            {username: req.body.username_email}
        ]})
        .exec((err,user)=>{
            if(user){
                let check = bcrypt.compareSync(req.body.password, user.password);
                if(check){
                    const token = jwt.sign({email:user.email},process.env.secret_key)
                    res.status(201).json({
                        token: token
                    })
                }else{
                    res.status(404).json()    
                }
            }else{
                res.status(404).json()
            }
        })
    },
    deleteUser(req,res){
        User.deleteOne({'_id': req.body.id})
        .then(result=>{
            res.status(200).json(result)
        })
    }
}