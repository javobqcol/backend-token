import  {mongoose}  from "mongoose";
import { MONGO_DB } from "../config/config.js";

export const dbconnect = async() =>{
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(MONGO_DB)
    console.log('database - connected');
  } catch (error) {
    console.error(error)
  }
}