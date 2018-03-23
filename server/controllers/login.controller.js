const User = require('../model/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10
var uniqueValidator = require('mongoose-unique-validator')

module.exports = {
    createUser (req,res){
        const { username, email, password } = req.body
        User.findOne({$or: [
            {email: email},
            {username: username}
        ]})
        .exec()
        .then(user=>{
            console.log(user)
            if(user){
                res.status(409).json({
                    message: `This ${email} email address has already taken`
                })
            }else{
                let salt = bcrypt.genSaltSync(saltRounds);
                let hash = bcrypt.hashSync(password, salt);
                let newUser;
                if(username === 'admin'){
                    newUser = new User({
                        username,email,password: hash,status:'Admin'
                    })  
                }else{
                    newUser = new User({
                        username,email,password: hash
                    }) 
                }
                newUser.save((err,response)=>{   
                    if(err){return res.status(409).json(err)}
                    else{
                        const token = jwt.sign({id:response._id, email: response.email},process.env.secret_key,{ expiresIn: 60 * 1 })
                        res.status(200).json({
                            token: token,
                            userid: response._id,
                            status: response.status
                        })
                    }
                })
            }
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
            {email: req.body.username},
            {username: req.body.username}
        ]})
        .exec((err,user)=>{
            if(user){
                let check = bcrypt.compareSync(req.body.password, user.password);
                if(check){
                    const token = jwt.sign({email:user.email},process.env.secret_key,{ expiresIn: 60 * 1 })
                    console.log(token)
                    res.status(201).json({
                        token: token,
                        userid: user._id,
                        status: user.status
                    })
                }else{
                    res.status(404).json()    
                }
            }else{
                res.status(404).json({
                    error: 'error'
                })
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