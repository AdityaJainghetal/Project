import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'



const Display = () => {
  const [mydata , setMydata] = useState([]);

  const loaddata=()=>{
    let api= "http://localhost:8000/employer/datadisplay";
    axios.get(api).then((res)=>{
      setMydata(res.data);
      console.log(res.data);
      
    })
  }

  useEffect(()=>{
    loaddata()
  },[])


  const ans= mydata.map((key)=>{
    return(
      <>
      <tr style={{border:"2px solid black"}} className='border-2 font-serif hover:bg-neutral-400 bg-slate-400 font-medium size-9  ' >
        <td>{key.name}</td>
        <td>{key.price}</td>
        <td>{key.description}</td>
        <td>{key.category}</td>
        <th >
        
        
        <img style={{width:"200px", height:"200px"}} src={key.image}  alt="" className='w-28 h-20 text-center' /></th>
        
      </tr>
      
      </>
    )
  })

  return(
    <>
    <div className='image'>
        <div  style={{paddingLeft:"300px", width:"100%"}}>
    <h1 className='font-serif font-semibold text-4xl pt-8 '></h1>


    <table className='text-center font-medium bg-zinc-500  w-5/6 size-7 border-red-950 text-xl '   >
      <tr>
        <th className='text-2xl'  >Person name</th>
        <th className='text-2xl' >Price</th>
        <th className='text-2xl' >description</th>
        <th className='text-2xl' >Category</th>
        <th className='text-2xl'>image</th>
      </tr>
      {ans}
    </table>
    </div>
    </div>
    </>
  )
  
  
  
  
}

export default Display;