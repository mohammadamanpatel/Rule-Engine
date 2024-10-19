import mongoose from 'mongoose'

mongoose.set('strictQuery', false) 

const DBConnection = async () => {
    try {
        const { connection } = await mongoose.connect(
            process.env.MONGO_URL
        );
        if (connection) {
            console.log('yes DB is connected', connection.host);
        }
    }
    catch (e) {
        console.log(e);
        process.exit(1)
    }
}
export default DBConnection
