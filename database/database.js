import mongoose from "mongoose";


const connectDb = () => {

    const mongourl = 'mongodb+srv://meghrajsinh2908:WGg6hpicuXrnaQar@cluster0.mm9kd.mongodb.net/'
    
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "TodoM"
    }).then(()=> console.log("mongoodb connected...")).catch((e)=> console(e));
}


export default connectDb;