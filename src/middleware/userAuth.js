import jwt from 'jsonwebtoken'


export const isUserVaild = (req, res, next) => {
  const secret = process.env.SECRET_KEY
  const token = req.cookies.jwtToken
  
  if(!token) res.status(401).json({
    success:false, message:'Access Denied '
  })

  try {
    const data = jwt.verify(token, secret);
    req.user = data; // Adding the user information to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, user:null, message: 'Invalid Token' });
  }
}