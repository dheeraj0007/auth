import mongoose from "mongoose";
mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error while connecting to DB'));
db.once('open', function () {
    console.log("Successfully connected to DB");
})

export default db;