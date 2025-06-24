
//1.mongode insatll => npm i mongoose
var mongoose = require("mongoose");
//mongoose.connect("url").then(()=>{}).catch(()=>{})
mongoose.connect("")
.then(()=>{
    console.log("Db connected")
})
.catch((err)=>{
    console.log(err)
});