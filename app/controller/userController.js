const { passwordHash,passwordCompare } = require("../middleware/Hashing");
const { createJwtToken } = require("../middleware/JwtAuth");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// user signup 
exports.createUser = async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        // validate input
        if(!(username &&email &&password)){
         res.status(400).send({message:"content can't be empty"});
         return;
        }
         const checkUsername = await User.findOne({
             where: {
               username: req.body.username,
             },
        });
          //if username exist in the database respond with a status of 409
         if (checkUsername) {
           return res.status(409).json("username already taken");
           }
         // check for already existing user
          const checkUser = await User.findOne({ where: { email: req.body.email } });
         if(checkUser){
          res.status(404).send({message:"User with email already exist"});
          return;
         }
        // Take the password,then hash it
        const HashPassword = await passwordHash(password);
        // destructure and save the users details
        const user = {username,email,password:HashPassword};
        const newUser =await User.create(user);
        // Tokenize the payload
        const payload = {userId:newUser.id};
        const token = createJwtToken(payload);
        // success response
        res.status(200).json({message:"User successfully created",newUser,token});
        return;
    }catch(err){
     res.status(500).send({message:err.message})
    }
};

// user login

exports.userLogin = async(req,res)=>{
    try{
     const {username,password}=req.body;
    //  validate input
    if (!(username&&password)) {
        res.status(400).send({message:"Input the rightly"});
        return ;
        };
        // check if user exist
        const user = await User.findOne({where:{username}});

        if(!user){
            res.status(404).send({message:"User not found"});
            return;
        }
        // check for password
        const checkPassword = await passwordCompare(password,user.password);
        if(!checkPassword){
            res.status(406).send({message:"Invalid Credentials"});
            return;
        }
        // Tokenize the payload
        const token = createJwtToken({userId:user.id});
        // return a success response
        res.status(200).send({message:"User successfully loggedIn",user,token});
        return;

    }catch(err){
        res.status(500).send({ message: err.message });
    }
};

// Get All User
exports.getAllUser = async(req,res)=>{
    try {
        const users = await User.findAll();
        res.status(200).json(users);
        return;
    } catch (err) {
        res.status(500).send({ message: err.message });
        return;
    }
};

// Find a user by id
exports.viewUser = async(req,res)=>{
    try{
        const userId = req.params.userId;
        const user = await User.findByPk(userId)
        if(!user){
            res.status(404).json({message:"User not found"});
            return;
        }
        res.status(200).json({user});
        return;
    }catch(err){
        res.status(500).send({ message: err.message });
    }
};