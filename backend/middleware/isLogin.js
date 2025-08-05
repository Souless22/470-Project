import jwt from 'jsonwebtoken'
import User from '../schema/users.js'

const isLogin = (req,res,next)=>{
    try {
        console.log(req.cookie.jwt)
        const token = req.cookies.jwt;
        console.log(token)
        if(!token) return res.status(500).send({success:false, message:"User unauthorized"})
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        if(!decode) return res.status(500).send({success:false, message:"User unauthorized - invalid token"})
        const user = User.findById(decode.userID).select("-password");
        if(!user) return res.status(500).send({success:false, message:"User not found"})
        req.user = user,
        next()
    } catch (error) {
        console.log(`error in isLogin middleware ${error.message}`);
        res.status(500).send({
            success: false,
            message: error
        })
        
    }
}
export default isLogin