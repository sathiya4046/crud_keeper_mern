const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const Notes = require('./models/Notes')
const bodyParser = require('body-parser')


const app = express()
const port = 4000

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/authCrudKeeper')
  .then(() => console.log('Connected!'));

const verifyUser = (req,res,next)=>{
    const token = req.headers.authorization
    if(!token){
        res.json({Status:"Unauthorized"})
    }else{
        jwt.verify(token,"jwt-private-key",(err,decoded)=>{
            if(err){
                res.json({Status:"Invalid Token"})
            }else{
                req.user = decoded
                next()
            }
        })
    }
}
app.get('/notes',verifyUser,(req,res)=>{
    res.json({Status:"Success"})
})
app.post('/register',async (req,res)=>{
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    try{
        const user =await User.findOne({email:email})
        if(user){
            return res.json({message:"Email already exists"})
        }else{
            const hashPassword =await bcrypt.hash(password.toString(),10)
            await User.create({name:name,email:email,password:hashPassword})
            .then(user=> res.json({Status:"Success"}))
            .catch(err=>console.log(err))
        }
    }catch(error){
        console.log(error)
    }
})

app.post('/login',async (req,res)=>{
    const email = req.body.email
    const password = req.body.password
    try{
        const user =await User.findOne({email:email})
        if(user){
            const comparePassword =await bcrypt.compare(password,user.password)
            if (!comparePassword) return res.json({Status:'Invalid credentials'});
            const token = jwt.sign({ id: user._id }, "jwt-private-key", { expiresIn: '1h' });
            res.json({Status:"Success", token });
        }else{
            return res.json({message:"Email already exists"})
        }
    }catch(error){
        console.log(error)
    }
})
app.get('/',verifyUser,(req,res)=>{
    Notes.find({userId:req.user.id})
    .then(user => res.json(user))
    .catch(err=>res.json(err))
})

app.put("/update/:id",(req,res)=>{
    const id = req.params.id
    Notes.findByIdAndUpdate({_id:id},{title:req.body.title,notes:req.body.notes})
    .then(user => res.json(user))
    .catch(err=>res.json(err))
})
app.post("/input",verifyUser,(req,res)=>{
    Notes.create({...req.body,userId:req.user.id})
    .then(user => res.json(user))
    .catch(err=>res.json(err))
})


app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id
    Notes.findByIdAndDelete({_id:id})
    .then(user => res.json(user))
    .catch(err=>res.json(err))
})

app.listen(port,()=>console.log("port running"))
