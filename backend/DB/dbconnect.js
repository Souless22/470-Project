import mongoose from "mongoose";

const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT),
        console.log("DB connected Succesfully");
    } catch (error) {
        console.log("db failed")
        console.log(console.error);
    }
}
 

export default dbConnect