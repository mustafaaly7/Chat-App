import mongoose from "mongoose"


export const connectDb=async()=>{
try {
    
const connect = await mongoose.connect(process.env.MONGODB_URI)
// console.log(`MongoDb Connected : ${mongoose.connection.host}`);
console.log(`MongoDb Connected `);

} catch (error) {
console.log(`error ${error}`);
    
}



}
