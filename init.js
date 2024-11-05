const mongoose = require("mongoose");

const login = require("./models/login.js");
main().then(()=>{
    console.log("connection success");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/aviskar');

  
}
let logins = [{
    username: "arham",
    password: "Arham@123",
    email: "arham@gmail.com",
},{
    username: "rahul",
    password: "rahul@123",
    email: "rahul@gmail.com",
},{
    username: "umesh",
    password: "umesh@123",
    email: "umesh@gmail.com",
}];

login.deleteMany({});
login.insertMany(logins
   );