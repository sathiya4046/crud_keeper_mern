import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import {MdEdit,MdDelete} from "react-icons/md"

const Content = () => {
    const [content,setContent] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
            setInterval(()=>{
                try{
                    axios.get("http://localhost:4000")
                   .then(res=>setContent(res.data))
                   .then(err=>console.log(err))
               }catch(error){
                   return console.log(error)
               }
            },1000)
    },[])

    const handleDelete =(id)=>{
        axios.delete(`http://localhost:4000/delete/${id}`)
        .then(res=>{
            console.log(res)
            navigate('/')
        })
        .then(err=>console.log(err))
    }

  return (
    <div>
            <div className="container-fluid">
                {content.map((i)=>(
                    <div className="card m-4" id='card'>
                    <div className="card-body" key={i._id}>
                        <h5 className="card-title">{i.title}</h5>
                        <p className="card-text">{i.notes}</p>
                        <Link to={`/edit/${i._id}`} className="btn btn-primary m-2"><MdEdit/></Link>
                        <button onClick={()=>handleDelete(i._id)} className="btn btn-primary ms-4"><MdDelete/></button>
                    </div>
                    </div> 
                ))}
                
            </div> 

    </div> 
  )
}

export default Content