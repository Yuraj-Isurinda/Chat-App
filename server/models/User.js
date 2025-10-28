import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        requried: true,
        unique: true
    },
    fullname: {
        type : String,
        required: true
    },
    password: {
        type : String,
        required: true,
        minlength: 6
    },
    profilePic: {
        type : String,
        default: ""
    },
    bio: {
        type : String,
    }

},
{
    timeseries: true
}    
)

const User = mongoose.model("User", userSchema)

export default User;