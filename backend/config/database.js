const mongoose = require('mongoose');

const connectDB=()=>{
     mongoose.connect(`${process.env.DB_URL}`)
  .then(() => console.log('Connected to local database')).catch((err)=>{console.log(err,"error in connectDb");
  })
}

module.exports=connectDB