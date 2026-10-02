const path = require("path");
//The statement const path = require("path"); in Node.js is used to include the built-in Path module in your code. 
const express = require("express");
const multer = require("multer");

//create disk storage destination and filename
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,"./uploads");
    },
    filename: function(req,file,cb){
        return cb(null ,`${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({storage});

const app = express();//creates an application instance which is conventionally stored in a variable named app.

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
// Express application to use the EJS template engine and specify the directory where the application's view templates are located.

app.use(express.json());//middle ware to parse json
app.use(express.urlencoded({extended: true}));//to parse form data

app.get("/",(req,res) => {
    return res.render("home");
});

//poat request on /upload on a single image
app.post("/uploads",upload.single("profileImage"),(req,res) => {
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/");
})

app.listen(8000,() => {
    console.log("server started sucessfully");
})