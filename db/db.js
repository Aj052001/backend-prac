import mongoose from 'mongoose'



const dbConnection = async () => {
    try {
        await mongoose.connect("mongodb+srv://ajsingh052001_db_user:ajsingh052001_db_user@cluster0.ovrur7l.mongodb.net/data?appName=Cluster0");
        console.log("connected to database");
    } catch (err) {
        console.log(err);
    }
};


export default dbConnection;