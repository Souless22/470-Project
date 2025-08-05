import bcrypt from 'bcryptjs';
import User from '../schema/users.js';
import jwtwebToken from '../utils/jwtwebToken.js'

export const userRegister=async(req,res)=>{
    try {
        const{fullname, username, email, gender, password, displayPicture} = req.body;
        const user = await User.findOne({username,email});
        if (user) return res.status(500).send({success: false, message: "User already exists"});
        const hashpassword = bcrypt.hashSync(password, 8);
        const boy = displayPicture || 'https://www.vecteezy.com/vector-art/439863-vector-users-icon?username=$(username)';
        const girl = displayPicture || 'https://www.vecteezy.com/vector-art/1993889-beautiful-latin-woman-avatar-character-icon?username=$(username);'

        const newUser = new User({
            fullname,
            username,
            email,
            password:hashpassword,
            gender,
            displayPicture: gender=="male" ? boy: girl
        })

        if(newUser){
            await newUser.save();
            jwtToken(newUser._id,res)

        }else{
            res.status(500).send({success: false, message:"Invalid User"})
        }
        
    res.status(201).send({
        _id:newUser._id,
        fullname:newUser.fullname,
        username:newUser.username,
        displayPicture:newUser.displayPicture,
        email:newUser.email
    })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error              
        })
        console.log(error);
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(500).send({ success: false, message: "Email doesn't exist in register" });
        const comparePass = bcrypt.compareSync(password, user.password || "");
        if (!comparePass) return res.status(500).send({ success: false, message: "Email or password doesn't match" });

        jwtwebToken(user._id, res);
        res.status(200).send({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            displayPicture: user.displayPicture,
            email: user.email,
            message: "Successfully login"
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        });
        console.log(error);

    }
}

export const userLogOut=async(req,res)=>{
    try {
        res.cookie("jwt",'',{
            maxAge:0
        })
        res.status(200).send({message:"user logout"})
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        });
        console.log(error);

    }
}