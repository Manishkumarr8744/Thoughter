const express = require('express');
const router=express.Router();
const {createConcern}=require("../controllers/concernController");  

router.route("/concern").post(createConcern);


module.exports=router;