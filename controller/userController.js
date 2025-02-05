import validator from "validator";
import bcrypt from "bcrypt";
import User from "../model/user.js";
import jwt from "jsonwebtoken";
import env from "dotenv";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

env.config();

const key = process.env.JWTKEY
const saltRound = 10

const userRegister = async (req, res) => {
    const {username, fullname, email, password}= req.body
    const verifyToken = uuidv4();
    

    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: "Password is not strong enough" });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Email is not valid" });
    }
    if (username.length < 3) {
        return res.status(400).json({ error: "Username must be at least 3 characters long" });
    }
    if (fullname.length < 3) {    
        return res.status(400).json({ error: "Fullname must be at least 3 characters long" });
    }
    const check = await User.findOne({ where: { email: email } });
    if (check) {
        return res.status(400).json({ error: "Email already exists" });
    }
    const usernameCheck = await User.findOne({ where: { username: username } });
    if (usernameCheck) {
        return res.status(400).json({ error: "Username already exists" });
    }
    
    bcrypt.genSalt(saltRound, (err, salt) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            try {
                
            
                const transporter = nodemailer.createTransport({
                   service: "gmail",
                    auth: {
                      user: process.env.EMAIL,
                      pass: process.env.PASSWORDEMAIL,
                    },
                  });
               
                const message = {
                    from: `Chill <${process.env.EMAIL}>`,
                    to: email,
                    subject: "Email Verification",
                    html: `
                    <p>Click <a href="http://localhost:3000/api/user/verify-email/${verifyToken}">here</a> to verify your email</p>
                    `,
                }
                
                transporter.sendMail(message, (err, info) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("Email sent: " + info.response);
                    }
                  });

                  
                await User.create({ username, fullname, email, password: hash, verify_token:verifyToken });
                return res.status(201).json({ message: "Verification email sent" });
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    });

}

const userLogin = async (req, res) => {
    const {email, password} = req.body

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Email is not valid" });
    }

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        return res.status(400).json({ error: "User not found" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ error: "Password is incorrect" });
    }
    if (!user.is_verify) {
        return res.status(400).json({ error: "Email is not verified, please verify your email" });
    }
    
    const token = jwt.sign({ id: user.id }, key, { expiresIn: "3D" });

    const {password: _, ...userData} = user.dataValues

    return res.status(200).json({ userData, token });
}

const verifyEmail = async (req, res) => {
    const {token} = req.params

    const user = await User.findOne({ where: { verify_token: token } });
    if (!user) {
        return res.status(400).json({ error: "User not found" });
    }
    await User.update({ is_verify: true, verify_token: null }, { where: { id: user.id } });
    return res.status(200).json({ message: "Email verified successfully" });
}

const uploadData = (req, res) => {
        res.json({
            status: "success",
            data: {
              filename: req.file.filename,
              path: req.file.path,
              size: req.file.size
            }
          });
}

export {userRegister, userLogin, verifyEmail, uploadData}