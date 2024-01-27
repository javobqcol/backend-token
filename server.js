
import { EXPRESS_SERVER, PORT } from "./src/config/config.js"
import { app } from "./src/app.js"
import { dbconnect } from "./src/database/database.js"



dbconnect().then(() =>
   app.listen(PORT, () => console.log(`${EXPRESS_SERVER}${PORT} is running`) )
)