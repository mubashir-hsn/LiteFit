import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    profileImage : {
        type : String
    },
    role : {
        type : String,
        default : 'user'
    },
    bio: {
        type : String,
        maxlength : 200
    },
    profession : String,
    
    isVerified: {
        type : Boolean,
        default : false
    },
    verificationCode: String,
    token: String,
},{timestamps: true})

const User = mongoose.model("User",userSchema)

export default User