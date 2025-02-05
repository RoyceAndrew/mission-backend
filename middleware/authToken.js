import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWTKEY);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token expired or invalid" });
    }
};