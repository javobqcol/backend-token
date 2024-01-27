import { Schema, model } from "mongoose";


const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    active:{
      type: Boolean,
      required:true,
      default:true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("User", userSchema)