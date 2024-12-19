import React, { useEffect, useState } from 'react'
import Content from './Content'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaNoteSticky } from 'react-icons/fa6'

const Notes = () => {
    const [auth,setAuth] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
      const verifyUser = async ()=>{
        const response = await axios.get("http://localhost:4000/notes",{withCredentials:true})
        if(response.data.Status==="Success"){
          console.log(response)
          setAuth(true)
        }else{
          setAuth(false)
        }
      }
      verifyUser()
    },[])

    const handleLogout = ()=>{
      axios.get('http://localhost:4000/logout',{withCredentials:true})
      .then(res=>
        {
          if(res.data.Status==="Success"){
            navigate('/login')
          }
        }
      )
      .then(err=>console.log(err))
    }
  return (
    <div>
      {auth?
      <>
        <nav className="navbar navbar-light bg-warning">
            <i className="navbar-brand ms-4">
            <FaNoteSticky className='fs-2 mb-2'/>
            <strong className='ms-2 fs-2'>Notes</strong>
            </i>
            <button 
            className="btn btn-danger me-2"
            onClick={()=>handleLogout()}  
          >Logout</button>
        </nav>
        <main>
        <Content/>
        </main>
      </> :
      <>
      <nav className="navbar navbar-light bg-warning">
            <i className="navbar-brand ms-4">
            <FaNoteSticky className='fs-2 mb-2'/>
            <strong className='ms-2 fs-2'>Notes</strong>
            </i>
        </nav>
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center vh-100'>
          
          <div className='border p-5'>
            <h1>Not Author</h1>
            <hr />
            <div className='d-flex justify-content-center align-items-center'>
            <Link to={'/login'}> <button className="btn btn-success mb-2">Login</button> </Link>
            </div>
          </div>

        </div>
      </>
      }
    </div>
  )
}

export default Notes