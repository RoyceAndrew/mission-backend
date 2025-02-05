import express from "express";
import env from "dotenv";
import chill from "./router/chill.js";
import user from "./router/user.js";
import { authToken } from "./middleware/authToken.js";

env.config();

const app = express();

app.use(express.json()); 

app.use('/api/chill', authToken ,chill);

app.use('/api/user', user);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});