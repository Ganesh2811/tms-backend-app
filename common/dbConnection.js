import mongoose from "mongoose";

const dbconnection = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("database connected");
    }
    catch(error){
        console.log("db error: " + error);
    }
}

export default dbconnection;