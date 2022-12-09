import mongoose from "mongoose";


const dbConnection = async() => {
    try {
        mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            UseUnifiedTopology: true,
        });
        console.log('Database Online - Working');
    } catch (error) {
        throw new Error('Database Error')
    }
}

export {
    dbConnection
}