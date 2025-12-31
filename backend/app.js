const express = require('express')
const app = express()
const cors=require('cors')
const cookieParser=require("cookie-parser")

app.use(express.json());
app.use(cookieParser()) 
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: `${process.env.FRONTEND_URL}`,  // your React dev URL
  credentials: true,                // allow cookies if needed
}));


const user=require("./Routes/userRoute")
const post =require("./Routes/postRoute")
const concern =require("./Routes/concernRoute")

app.use("/api/v1",user)
app.use("/api/v1",post)
app.use("/api/v1",concern)

app.get('/', function (req, res) {
  res.send('Hello World')
})



module.exports=app