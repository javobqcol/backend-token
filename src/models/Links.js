import { Schema, model } from "mongoose";
const linkSchema = new Schema({
  longLink:{
    type:String,
    required:true,
    trim:true
  },
  nanoLink:{
    type:String,
    required:true,
    trim:true,
    unique:true
  },
  uid:{
    type:Schema.Types.ObjectId,
    ref: "user",
    requires:true
  },
})

export default model("Link", userSchema)