import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import connectDB from './dbConnection.js';
import jobRouter from './src/routes/jobRoute.js'
import userRouter from './src/routes/userRoute.js'
import bookmarkRouter from './src/routes/bookmarkRoute.js';
import searchRouter from './src/routes/searchRoute.js'



//initalize app
const app = express()

// Load environment variables 
dotenv.config()
export const secret = process.env.SECRET_KEY

//Database connection
const mongo_uri = process.env.MONGO_URI
connectDB(mongo_uri)

//Middleware
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())


//Routes
app.use('/job', jobRouter)
app.use('/user', userRouter)
app.use('/search', searchRouter)
app.use('/bookmark', bookmarkRouter)
app.get('/', (req, res)=>{
  res.status(200).json({
    sucess: true,
    name:'NextHire',
    route:[
      {'/job/all/:jobCategory':'to fetch all jobs of a specific category'},
      {'/job/all/:jobId':'to fetch a specific Job'},
      {'/serach' : 'to search any job by title,category,location,employment type'},
      {'/user/register' : 'to register a new User'},
      {'/user/login' : 'to login a new User'},
      {'/bookmark' : 'to fetch user all bookmarks'},
      {'/bookmark/add' : 'to add a bookmarks for a user'},
      {'/bookmark/delete' : 'to delete a bookmarks for a user'},
    ]
  })
})

// Start the server
const port = process.env.PORT || 4000
app.listen(port,()=>{
  console.log(`server is running on ${port}`)
})