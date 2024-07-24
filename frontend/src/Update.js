import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Update = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
             axios.get('http://localhost:4000/edit/'+id)
            .then(res=>setData({title:res.data.title,notes:res.data.notes}))
            .then(err=>console.log(err))
    },[])
    const [data, setData] = useState([{
        title:"",
        notes:""
    }])

    const handleUpdate = async (e)=>{
        e.preventDefault()
        try{
            await axios.put("http://localhost:4000/update/"+id,data)
        .then(res=>{
            console.log(res)
            navigate('/')
        })
        .then(err=>console.log(err))
        }catch(error){
            console.log(error)
        }
    }
  return (
    <div>
        <form className='container mt-4' id='container' onSubmit={handleUpdate}>
            <h2>Update</h2>
            <div className="form-group p-2">
                <input 
                    type="text" 
                    className="form-control" 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp" 
                    placeholder="Title"
                    value={data.title}
                    onChange={e=>setData({...data,title:e.target.value})}
                />
            </div>
            <div className="form-group p-2">
                <textarea 
                    type="password" 
                    className="form-control" 
                    id="exampleInputPassword1" 
                    placeholder="Write a notes"
                    value={data.notes}
                    onChange={e=>setData({...data,notes:e.target.value})}
                />
            </div>
            <button type="submit" className="btn btn-primary ms-2">Submit</button>
        </form>
    </div>
  )
}

export default Update