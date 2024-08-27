import mongoose, { Mongoose } from 'mongoose'
const userShcema = new mongoose.Schema({
    name: { type: String, requred: true },
    email: { type: String, required: true },
    password: { type: String, required: true , select:false},
    googleId : {type:String}
})

export const User = mongoose.models?.user || mongoose.model("User", userShcema);
