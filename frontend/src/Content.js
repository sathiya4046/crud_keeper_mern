import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {MdEdit,MdDelete} from "react-icons/md"
import { FaPlus } from 'react-icons/fa6'

const Content = () => {
    const [title, setTitle] = useState("")
    const [notes, setNotes] = useState("")
    const [content,setContent] = useState([])
    const [edit,setEdit] = useState(false)
    const [id,setId] = useState()


    useEffect(()=>{
            setInterval(()=>{
                try{
                    axios.get("http://localhost:4000/note",{withCredentials:true})
                   .then(res=>setContent(res.data))
                   .then(err=>console.log(err))
               }catch(error){
                   return console.log(error)
               }
            },1000)
    },[])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:4000/input",{title,notes},{withCredentials:true})
            .then(res=>console.log(res))
            .then(err=>console.log(err))
        }catch(error){
            console.log(error)
        }
        setTitle("")
        setNotes("")
    }

    const handleEdit = (id)=>{
        content.forEach((i)=>{
            if (i._id===id){
                setId(id)
                setTitle(i.title)
                setNotes(i.notes)
                setEdit(true)
            }else{
                return i
            }
        })
    }
    const handleUpdate = (e)=>{
        e.preventDefault()
        axios.put(`http://localhost:4000/update/${id}`,{title,notes})
        .then(res=>console.log(res))
        setTitle("")
        setNotes("")
        setEdit(false)
    }
    const handleDelete =(id)=>{
        axios.delete(`http://localhost:4000/delete/${id}`)
        .then(res=>{
            console.log(res)
        })
        .then(err=>console.log(err))
    }

  return (
    <div>
        <div>
        <form className='container mt-4' id='container' onSubmit={edit ?handleUpdate :handleSubmit}>
            <div className="form-group p-2">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Title"
                    value={title}
                    onChange={e=>setTitle(e.target.value)}
                />
            </div>
            <div className="form-group p-2">
                <textarea 
                    type="text" 
                    className="form-control" 
                    placeholder="Write a notes"
                    value={notes}
                    onChange={e=>setNotes(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-success ms-2"><FaPlus/></button>
        </form>
        </div>
        <div className="container-fluid">
                {content.map((i,index)=>(
                    <div className="card m-4" id='card' key={index}>
                    <div className="card-body">
                        <h5 className="card-title">{i.title}</h5>
                        <p className="card-text">{i.notes}</p>
                        <button onClick={()=>handleEdit(i._id)} className="btn btn-primary m-2"><MdEdit/></button>
                        <button onClick={()=>handleDelete(i._id)} className="btn btn-primary ms-4"><MdDelete/></button>
                    </div>
                    </div> 
                ))}
                
        </div> 
    </div> 
  )
}

export default Content