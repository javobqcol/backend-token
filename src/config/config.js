import { config } from "dotenv"
config()
export const PORT = process.env.PORT || 3500
export const EXPRESS_SERVER = process.env.EXPRESS_SERVER
export const MONGO_DB = process.env.MONGO_DB