import mongoose from 'mongoose'



const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to database");
    } catch (err) {
        console.log(err);
    }
};


export default dbConnection;