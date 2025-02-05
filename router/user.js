import express from "express";
import { authToken } from "../middleware/authToken.js";
import { upload } from "../middleware/upload.js";
import { userLogin, userRegister, verifyEmail, uploadData } from "../controller/userController.js";

const router = express.Router();

router.post("/register", userRegister);

router.post("/login", userLogin);

router.post("/upload", authToken, upload.single("file"), uploadData);

router.get("/verify-email/:token", verifyEmail);

export default router;