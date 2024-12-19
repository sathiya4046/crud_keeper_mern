import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Nav from './Nav'

function Login({setToken}) {
  const navigate = useNavigate()
  const [data,setData] = useState(null)

  const [login, setLogin] = useState([{
    email:"",
    password:""
  }])

  const handleLogin = async(e)=>{
    e.preventDefault()
    try{
    await axios.post("http://localhost:4000/login",login,{withCredentials:true})
    .then(res=>{
      if (res.data.Status === "Success"){
        navigate('/notes')
      }else{
        setData(res.data.Error)
      }
    })
    .then(err=>console.log(err))
    }catch{
      console.log("login error")
    }
  }


  return (
    <div>
    <Nav/>
    <div className='container-fluid d-flex justify-content-center align-items-center bg-light register'>
        <form className="form-inline border rounded p-4 w-50" onSubmit={handleLogin}>
        <div className="form-group">
          <h1 className="text-center mb-4">Login</h1>
          <input 
            type="text" 
            className="form-control my-4" 
            placeholder="Email"
            onChange={(e)=>setLogin({...login,email:e.target.value})}
            required
          />
            <input 
            type="password" 
            className="form-control mb-3" 
            placeholder="Password"
            onChange={(e)=>setLogin({...login,password:e.target.value})}
            required
            />
            {data && <span className='text-warning'>{data}</span> }
        </div>
        <p className='mt-3'>If you don't have account <Link className='text-info text-decoration-none' to= "/">sign up</Link></p>
        <div className='d-flex justify-content-center align-items-center'><button type="submit" className="btn btn-success mb-2 w-50">Login</button></div>
      </form>
    </div>
    </div>
  )
}

export default Login