import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {MdEdit,MdDelete} from "react-icons/md"
import { FaPlus } from 'react-icons/fa6'
import { baseUrl } from './constant/url'

const Content = () => {
    const [title, setTitle] = useState("")
    const [notes, setNotes] = useState("")
    const [content,setContent] = useState([])
    const [edit,setEdit] = useState(false)
    const [id,setId] = useState()
    const [isExpanded, setIsExpanded] = useState(false)


    useEffect(()=>{
            setInterval(()=>{
                try{
                    axios.get(`${baseUrl}/note`,{withCredentials:true})
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
            await axios.post(`${baseUrl}/input`,{title,notes},{withCredentials:true})
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
        axios.put(`${baseUrl}/update/${id}`,{title,notes})
        .then(res=>console.log(res))
        setTitle("")
        setNotes("")
        setEdit(false)
    }
    const handleDelete =(id)=>{
        axios.delete(`${baseUrl}/delete/${id}`)
        .then(res=>{
            console.log(res)
        })
        .then(err=>console.log(err))
    }

  return (
    <div>
        <div className='content'>
            <form className='mt-4' onSubmit={edit ?handleUpdate :handleSubmit}>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control px-3 bg-secondary bg-opacity-10 fs-5" 
                        placeholder={isExpanded?"Title" : "Write a Notes"}
                        value={title}
                        onChange={e=>setTitle(e.target.value)}
                        onClick={()=>setIsExpanded(true)}
                    />
                </div>
                {
                    isExpanded && 
                    <div>
                        <div className="form-group my-3">
                    <textarea 
                        type="text" 
                        className="form-control px-3 bg-secondary bg-opacity-10 fs-5" 
                        placeholder="Write a notes..."
                        value={notes}
                        onChange={e=>setNotes(e.target.value)}
                    />
                        </div>
                        <div className='text-end'>
                        <button type="submit" className="rounded-pill btn btn-success me-3"><FaPlus/></button>
                        </div>
                    </div>
                }
            </form>
        </div>
        <div className="notes m-2">
                {content.map((i,index)=>(
                    <div className="card mx-auto mx-sm-2" id='card' key={index}>
                    <div className="card-body">
                        <h5 className="card-title">{i.title}</h5>
                        <hr />
                        <p className="card-text">{i.notes}</p>
                        <div className='d-flex justify-content-end'>
                        <button onClick={()=>handleEdit(i._id)} className=" rounded-pill btn btn-success mx-3"><MdEdit/></button>
                        <button onClick={()=>handleDelete(i._id)} className=" rounded-pill btn btn-success "><MdDelete/></button>
                        </div>
                    </div>
                    </div> 
                ))}
                
        </div> 
    </div> 
  )
}

export default Content