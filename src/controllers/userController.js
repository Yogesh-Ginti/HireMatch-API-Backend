import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import { secret } from '../../index.js';


export const handleUserRegister = async (req, res) => {
  const {username, email, password} = req.body;
  console.log('sec',secret)

   // Validate input
   if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    //Hash Password
    const hashedPassword = await bcrypt.hash(password,10)

    // Create new user
    const user = new userModel({username,email, password:hashedPassword})
    await user.save()

    //Genrate JWT Token
    const token = jwt.sign({email:email, userId:user._id}, secret, {expiresIn:'24h'})
    res.cookie('jwtToken',token)

    // Respond with success message
    return res.status(201).json({
      success: true,
      username: username,
      email: email,
      message: "User registered successfully"
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Error registering user' });
  }
}


export const handleUserLogin =async (req, res) => {
  const {email, password} = req.body

  if(!email || !password){
    return res.status(400).json({
      success:false,
      message:'All Field Required'
    })
  }

  try {
    const user = await userModel.findOne({email})
    const isPasswordVaild = bcrypt.compare(password, user?.password)
    if(!user || !isPasswordVaild){
      return res.status(401).json({
        success:false,
        message:"Invalid email or password"
      })
    }
    // Genrate JWT Token
    const token = jwt.sign({email:email, userId:user._id}, secret, {expiresIn:'24h'})
    res.cookie('jwtToken',token)

    return res.status(200).json({
      success:true, message:'Logged In Successfully'
    })
  } catch (error) {
    return res.status(500).json({
      success:false, message:error.message 
    })
  }
}


export const handleUserLogout = async (req, res) => {
  res.cookie('jwtToken', '', { maxAge: 1,}); // Set token cookie to expire immediately
  res.status(200).json({ success: true, message: 'Logged out successfully' });
}