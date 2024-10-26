import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import validate from './validate'
import Nav from './Nav'

const Register = () => {
  const navigate = useNavigate()
  const [errors,setErrors] = useState({})

  const [values, setValues]= useState([{
    name:"",
    email:"",
    password:""
  }])
  const handleRegister = async (e)=>{
    e.preventDefault()
    setErrors(validate(values))
    if(errors.name ==="" && errors.email==="" && errors.password===""){
      try{
        await axios.post('http://localhost:4000/register', values)
        .then(res=> {
          if (res.data.Status==="Success"){
            navigate('/login')
          }else{
            console.log(res)
          }}
          )    
        .then(err=>console.log(err))
      }catch{
        console.log("register error")
      }
    }else{
      console.log("not exist")
    }
      
    
  }

  return (
    <div>
      <Nav/>
    <div className='container-fluid d-flex justify-content-center align-items-center bg-light register'>
        <form className="form-inline border rounded p-4 w-50" onSubmit={handleRegister}>
        <div className="form-group">
          <h1 className="text-center mb-4">Register</h1>
          <input 
            name='name'
            type="text" 
            className="form-control mb-3" 
            placeholder="Name"
            onChange={e=>setValues({...values, name:e.target.value})}
            />
            {errors.name && <span className='text-warning'>{errors.name}</span> }
          <input 
            name='email'
            type="text" 
            className="form-control my-3" 
            placeholder="Email"
            onChange={e=>setValues({...values, email:e.target.value})}
            />
            {errors.email && <span className='text-warning'>{errors.email}</span> }
            <input 
            name='password'
            type="password" 
            className="form-control my-3" 
            placeholder="Password"
            onChange={e=>setValues({...values, password:e.target.value})}
            />
            {errors.password && <span className='text-warning'>{errors.password}</span> }
        </div>
        <p>Already you have account 
          <Link className='text-info text-decoration-none' to= "/login"> Login</Link>
        </p>
        <div className='d-flex justify-content-center align-items-center'>
          <button type="submit" className="btn btn-success mb-2 w-50">Register</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Register