import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname:{
        type: String,
        required: true

    },
    username:{
        type: String,
        required: true,
        unique: true

    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    gender:{
        type: String,
        required: true,
        enum:["male","female","other"]
    },
    password:{
        type: String,
        required: true,
        minlength: 6


    },
    displayPicture:{
        type: String,
        default: ""
    },
},{timestamps: true});


const User = mongoose.model("User", userSchema)

export default User;
  
