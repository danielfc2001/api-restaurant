import mongoose from "mongoose"

const mongoDBConnection = async () => {
    const connection = await mongoose.connect("mongodb://127.0.0.1:27017/restaurant")
    if (!connection) throw new Error("Problems with establishing connection to mongodb server.")
    console.log("Connected to mongoDB server.")
}

export default mongoDBConnection