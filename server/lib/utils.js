import jwt from "jsonwebtoken";

// generate token
// export const generateToken = (user)=>{
//     const token = jwt.sign({userId}, process.env.JWT_SECRET);
//     return token
// }
export const generateToken = (userId) => {
    if(!userId){
        console.error("Cannot generate token.userId is undefined");
        throw new Error("Invalid userId");
    }
    
    const token = jwt.sign(
        { userId: userId.toString() }, // Ensure it's a string
        process.env.JWT_SECRET, 
        { expiresIn: "7d" }
    );   
    return token;
}