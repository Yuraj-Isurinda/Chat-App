import jwt from "jsonwebtoken";

// generate token
export const generateToken = (user)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET);
    return token
}