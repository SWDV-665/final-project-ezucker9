const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Media=require("./models/media.js")
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Media API REST');
});


app.get("/media/:id",function (req, res) {
    

    Media.find({_id:req.params.id})
    .populate("media")
    .exec((err, data)=>{
        if(err)
            return res.status(500).json({
                ok: false,
                err
            });

        return res.json(data);

    })
 
});


app.post("/media",function (req, res) {
    
   let body = req.body;

    let media = new Media({
        username: body.username,
        password : body.password,
        Fname:body.Fname,
        Lname:body.Lname,
        city:body.city,
        State:body.State,
        Zip:body.Zip,
        email:body.email
    });

    media.save((err, new_data)=>{
        if(err)
            return res.status(500).json({
                ok: false,
                err
            });

        return res.json({
            ok:true,
            new_data
        });
    });
 
});

app.post("/login",function (req, res) {
    
    let body = req.body;
    console.log(req.body)

    let _username= body.username
    let _password=body.password
   
    Media.find({username:_username})
    .populate("media")
    .exec((err, data)=>{
        if(!err){
            user=data[0]

            if(user.username==_username && user.password==_password){
                return  res.json(data);
            }else{
                return   res.status(500).json({
                    ok: false,
                    message:"Wrong data"
                });
            }
        }else{
            return res.status(500).json({
                ok: false,
                err
            });
        }
        


    })
 
});





mongoose.connect("mongodb://localhost/MediaDB", (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Connect Succesfull");
});

app.listen(process.env.PORT || 3000, (err)=>{
    console.log("app listen on port: "+process.env.PORT);
})