import mongoose from 'mongoose'
import dotenv from 'dotenv'
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongo db dtatabase connected ${mongoose.connection.host}`)
    }
    catch (error) {
        console.log(error)
    }
}
export default connectDB