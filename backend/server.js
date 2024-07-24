import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()
const port = 4000

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/crudkeeper')
  .then(() => console.log('Connected!'));

const EmployeeSchema = new mongoose.Schema({
    title:String,
    notes:String
})

const EmployeeModel = mongoose.model("content",EmployeeSchema);

app.get('/',(req,res)=>{
    EmployeeModel.find({})
    .then(user => res.json(user))
    .catch(err=>res.json(err))
})
app.get('/edit/:id',(req,res)=>{
    const id =req.params.id
    EmployeeModel.findById({_id:id})
    .then(user => res.json(user))
    .catch(err=>res.json(err))
})
app.put("/update/:id",(req,res)=>{
    const id = req.params.id
    EmployeeModel.findByIdAndUpdate({_id:id},{title:req.body.title,notes:req.body.notes})
    .then(user => res.json(user))
    .catch(err=>res.json(err))
})
app.post("/input",(req,res)=>{
    EmployeeModel.create(req.body)
    .then(user => res.json(user))
    .catch(err=>res.json(err))
})


app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id
    EmployeeModel.findByIdAndDelete({_id:id})
    .then(user => res.json(user))
    .catch(err=>res.json(err))
})

app.listen(port,()=>console.log("port running"))
