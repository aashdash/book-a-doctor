 import validator from 'validator'
 import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'



 //api to register user
 const registerUser = async(req,res) =>{
    try{
        const {name,email,password} = req.body

if(!name || !password || !email){
    return res.json({success:false,message:"Missing Details"})
}

if(!validator.isEmail(email)){
    return res.json({success:false,message:"enter a valid email"})
}

if(password.length <8){
    return res.json({success:false,message:"enter a strong password"})
}

//hahing user pass
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password,salt)

const userData = {
    name,
    email,
    password:hashedPassword
}

const newUser  = new userModel(userData)
const user = await newUser.save()
// _id

const token = jwt.sign({id:user._id},process.JWT_SECRET )
res.json({success:true,token})

    }catch (error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
 }

const loginUser = async(req,res) => {

    try{

        const {email,password} = req.body
        const user = await userModel.findone({email})

        if(!user){
        res.json({success:false,message:'user does not exist'})

        }
        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"invalid credentials"})
        }

    }catch (error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

 export {registerUser,loginUser}