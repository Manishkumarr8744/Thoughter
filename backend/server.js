const app = require("./app")
const connectDB=require("./config/database")
const dotenv=require("dotenv")

dotenv.config({path:"./config/config.env"})

connectDB()

const server=app.listen(process.env.PORT,()=>{
    console.log(`server started on localhost ${process.env.PORT}`);
    
})