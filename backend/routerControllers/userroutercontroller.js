import bcrypt from 'bcryptjs';
import User from '../schema/users.js';


export const userRegister=async(req,res)=>{
    try {
        const{fullname, username, email, gender, password, displayPicture} = req.body;
        const user = await User.findOne({username,email});
        if (user) return res.status(500).send({success: false, message: "User already exists"});
        const hashpassword = bcrypt.hashSync(password, 8);
        const boy = displayPicture || 'https://www.vecteezy.com/vector-art/439863-vector-users-icon?username=$(username)';
        const girl = displayPicture || 'https://www.vecteezy.com/vector-art/1993889-beautiful-latin-woman-avatar-character-icon?username=$(username);'

    } catch (error) {
        
    }
}