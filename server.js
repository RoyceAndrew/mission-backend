import express from "express";
import env from "dotenv";
import chill from "./router/chill.js";

env.config();


const app = express();

app.use(express.json()); 

app.use('/api/chill', chill);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});