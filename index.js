const express = require("express");
const app = express();
//now its time for mongoose
const mongoose = require("mongoose");
//require path
const path = require("path");
const Listing = require("./models/listing");
const login = require("./models/login.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

//after creating views folder
app.set("views",path.join(__dirname,"/views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);

main().then(()=>{
    console.log("connection success");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/aviskar');

  
}

//home page for login
app.get("/",async(req,res)=>{
    let data = [{username:" "}]
    let msg = [("  ")];
    let send = {
        content: msg[0],
    };
    const allisting = await Listing.find({});
    
    res.render("listings/home.ejs",{allisting,data});
})
app.get("/enter",(req,res)=>{
    let msg = [("  ")];
    let send = {
        content: msg[0],
    };
    
    res.render("listings/login.ejs",{send});
})

app.post("/login",async(req,res)=>{
     
    let { password: checkpassword, email: checkemail} = req.body;
    
    
    try{
        const allisting = await Listing.find({});
        
        let data = await login.find({email: checkemail});
        
        
        if(data[0].email == checkemail & data[0].password == checkpassword){
           
            
            
            res.render("listings/home.ejs",{allisting,data});
    
        }
        else{
            let nemsg = [("wrong username and password")];
        send = {
            content:nemsg[0],
        };
        
        
        res.render("listings/login.ejs",{send});
        }
    }catch(err){
        
        let newmsg = [("wrong username and password")];
        send = {
            content:newmsg[0],
        };
        
        
        res.render("listings/login.ejs",{send});
        
        

       
        
    
    };
    
    
    
    
    
    
    
    
})

app.get("/register",(req,res)=>{
    res.render("listings/register.ejs");
})

app.post("/register",async(req,res)=>{
    let {username, email, password, confirmpassword} = req.body;
    try{
        let checkemail = await login.find({email:email });
        console.log(checkemail[0].email);
        res.redirect("/register");
    
   
    
    
        
    
    }catch(err){
        if(password == confirmpassword){
        
            let newlogin = new login({
                username: username,
                password: password,
                email: email,
                
            });
            newlogin.save().then((res)=>{
                
            }).catch((err)=>{
                console.log(err);
            })
            res.redirect("/enter");
                
        
            }
            else{
                console.log("hi");
                res.redirect("/register");

    

    
   
    
    }
    }


    
    


})

app.get("/show/:id",async(req,res)=>{
    let data = [{username:" "}]

    
    let { id } = req.params;
    const listing = await Listing.findById(id);
    
    res.render("listings/show.ejs",{listing,data})
})
app.listen(8080,()=>{
    console.log("server is listening");
})
