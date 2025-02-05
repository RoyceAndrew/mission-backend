import express from "express";
import { userLogin, userRegister, verifyEmail, uploadData } from "../controller/userController.js";

const router = express.Router();

router.post("/register", userRegister);

router.post("/login", userLogin);

router.post("/upload", uploadData);


router.get("/movie",  (req, res) => {
    res.send("user");
});

router.get("/verify-email/:token", verifyEmail);

export default router;