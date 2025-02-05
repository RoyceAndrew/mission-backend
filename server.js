import express from "express";
import env from "dotenv";
import chill from "./router/chill.js";
import user from "./router/user.js";
import { authToken } from "./middleware/authToken.js";
import multer from "multer";

env.config();

const app = express();

app.use(express.json()); 

app.use('/api/chill', authToken ,chill);

app.use('/api/user', user);

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        const message = err.code === 'LIMIT_FILE_SIZE' 
            ? 'File exceeds size limit' 
            : 'Invalid file type';
            
          return res.status(400).json({ status: "error", message });
        } else if (err) {
            return res.status(400).json({ status: "error", message: "Upload failed" });    
        }
        next();
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});