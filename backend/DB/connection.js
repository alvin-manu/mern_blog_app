import mongoose from "mongoose";


 export const connectDb = async()=>{
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL);
        console.log("Mongodb connected ",connection.connection.host) 
    } catch (error) {
        console.log(error)
    }
}