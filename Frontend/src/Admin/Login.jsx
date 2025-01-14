import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [input, setInput] = useState({});

  const navigate = useNavigate()
 
   const handleInput=(e)=>{
      let name=e.target.name; 
      let value=e.target.value;
      setInput(values=>({...values, [name]:value}));
   }

   const handleSubmit=(e)=>{
    e.preventDefault();
    let api="http://localhost:8000/users/usercheck";
    axios.post(api, input).then((res)=>{
                console.log(res.data.Data[0].name)
                console.log(res.data.Data[0].email)

                if(res.data.Data[0].name && res.data.Data[0].email){
                  window.localStorage.setItem("UserName", res.data.Data[0].name);
                window.localStorage.setItem("userEmail", res.data.Data[0].email);

                    message.success(res.data.msg);

                    navigate("/dashboard")

                }
            })
            .catch((err)=>{
                message.error(err.response.data.msg);
            })

          }
  return (
    <>
      <div style={{width:"500px" , margin:"auto", position:"relative", top:"100px", border:"2px solid black", padding:"30px", borderRadius:"10px", backgroundColor:"whitesmoke"}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleInput} />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' onChange={handleInput}/>
      </Form.Group>
      <div style={{textAlign:"center", width:"400px"}}>
      <Button variant="dark" type="submit" onClick={handleSubmit}>
        Submit
      </Button></div>
      <br />
      <div style={{padding:"10px"}}>
      <Button variant="light" type="submit" onClick={()=>{navigate("registration")}}>
      Don't have an account? 
      </Button>
      </div>
      </div>


</>
  )
}

export default Login