import React, { useState } from 'react'
import axios from 'axios'
import Content from './Content'
import {IoMdAdd} from "react-icons/io"


const Input = () => {
    const [title, setTitle] = useState("")
    const [notes, setNotes] = useState("")
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:4000/input",{title,notes})
            .then(res=>console.log(res))
            .then(err=>console.log(err))
        }catch(error){
            console.log(error)
        }
        setTitle("")
        setNotes("")
    }
  return (
    <div>
        <form className='container mt-4' id='container' onSubmit={handleSubmit}>
            <div className="form-group p-2">
                <input 
                    type="text" 
                    className="form-control" 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp" 
                    placeholder="Title"
                    value={title}
                    onChange={e=>setTitle(e.target.value)}
                />
            </div>
            <div className="form-group p-2">
                <textarea 
                    type="password" 
                    className="form-control" 
                    id="exampleInputPassword1" 
                    placeholder="Write a notes"
                    value={notes}
                    onChange={e=>setNotes(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary ms-2"><IoMdAdd/></button>
        </form>
        <Content/>
    </div>
  )
}

export default Input