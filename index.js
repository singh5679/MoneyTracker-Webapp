import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();

dotenv.config({
    path: "./.env"
})

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const port = process.env.PORT || 3000; // 
 
const connectDB = async () => {
    try {
       const mongoUrl = await mongoose.connect(`${process.env.MONGO_URL}/money-tracker`);
       console.log(`MongoDB connected: ${mongoUrl.connection.host}`);
    } catch (error) {
       console.error(`Error: ${error.message}`);
       process.exit(1);
    }
}
connectDB()
.then(() => {
   app.on("error", (error) => {
       throw error;
   })

    app.post("/add", addList)

    app.get("/", (req, res) => {
        res.set({
            'Allow-access-Allow-Origin': '*'
        })
        res.redirect("/");
    })

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })


})
.catch((error) => {
    console.log(`DB connection faliure! ${error}`);
})



const fieldSchema = new mongoose.Schema({
    category: String,
    amount: Number,
    description: String,
    date: String
})

const Field = mongoose.model("Field", fieldSchema);


const addList = async (req, res) => {
    const { category, amount, description, date } = req.body;
    await Field.create({ category, amount, description, date })   
    res.redirect("/");
}