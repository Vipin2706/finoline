require('dotenv').config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser")
const mongoose = require("mongoose")



app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine' , 'ejs')
mongoose.connect("mongodb+srv://admin_vipin:" + process.env.ADMIN_PASS + "@cluster0.nvnya.mongodb.net/FinolineDB",{useNewUrlParser:true,useUnifiedTopology:true});

/*creating schemas for news letter subscription */

const mailSchema = new mongoose.Schema({
    email:String,
});

const Mail = mongoose.model("Mail", mailSchema) 

/*Amount schema*/

const amountSchema = new mongoose.Schema({
    amount:String,
    month:String,
    name:String,
    number:Number,
});

const Loan = mongoose.model("Loan", amountSchema)

/*contact schema*/
const contactSchema = new mongoose.Schema({
    message:String,
    fname:String,
    lname:String,
    subject:String,
});

const Contact = mongoose.model("Contact" , contactSchema)

/*apply now schema*/
const applySchema = new mongoose.Schema({
    loanamt:Number,
    loanpur:String,
    Gender:String,
    Firstname:String,
    Lastname:String,
    Dependants:String,
    gmail:String,
    telnum:Number,
    martial:String,
    martailname:String,
    city:String,
    street:String,
    house:String,
    owner:String,
    industry:String,
    ename:String,
    wphno:Number,
    income:String,
})

const Apply = mongoose.model("Apply", applySchema)


/*get requests handeled here*/

app.get("/",(req,res)=>{
    res.render("home")
});
app.get("/home",(req,res)=>{
    res.render("home")
})
app.get("/loan",(req,res)=>{
    res.render("loan")
})
app.get("/faq", (req,res)=>{
    res.render("faq")
})
app.get("/contact",(req,res)=>{
    res.render("contact")
})
app.get("/bolg",(req,res)=>{
    res.render("blog")
})
app.get("/apply",(req,res)=>{
    res.render("apply")
})
app.get("/about",(req,res)=>{
    res.render("about")
})

/*all the post request are handeled here */

app.post("/home",(req,res)=>{
    const newMail = new Mail({
        email:req.body.mail
    })
    newMail.save((err)=>{
        if(!err){
            res.render("home")
        }else{
            console.log(err);
        }
    });
})

app.post("/rupees",(req,res)=>{
    const newLoan = new Loan({
        name :req.body.nominee,
        number:req.body.phno,
        amount:req.body.amount,
        month:req.body.month,
    });
    newLoan.save((err)=>{
        if(!err){
            res.render("home")
        }else{
            console.log(err);
        }
    });
})

app.post("/contact",(req,res)=>{
    const newContact = new Contact({
        message:req.body.text,
        fname:req.body.fname,
        lname:req.body.lname,
        subject:req.body.subject,
    })
    newContact.save((err)=>{
        if(!err){
            res.render("home")
        }else{
            console.log(err);
        }
    });
})

app.post("/apply",(req,res)=>{
    const newApply = new Apply({
        loanamt: req.body.purpose,
        loanpur: req.body.pprose,
        Gender: req.body.customRadioInline1,
        Firstname: req.body.ffname,
        Lastname: req.body.llname,
        Dependants: req.body.depends,
        gmail: req.body.ggmail,
        telnum:req.body.telnume,
        martial:req.body.married,
        martailname:req.body.mname,
        city:req.body.twn,
        street:req.body.strt,
        house:req.body.hname,
        owner:req.body.own,
        industry:req.body.eindus,
        ename:req.body.eenme,
        wphno:req.body.wphn,
        income:req.body.mincm, 
    })
    newApply.save((err)=>{
        if(!err){
            res.render("home")
        }else{
            console.log(err);
        }
    });
})



app.listen(process.env.PORT||3000 , ()=>{
    console.log("server started at port:3000")
})