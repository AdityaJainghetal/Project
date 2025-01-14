import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Insert = () => {
  const [input, setInput] = useState({});
  const [img, setImg] = useState(null);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

   
    if (!input.name || !input.price || !input.description || !input.category || !img) {
      message.error("All fields are required!");
      return;
    }

    const api = "http://localhost:8000/employer/datasave";
    const data = new FormData();

    data.append('file', img); 
    Object.keys(input).forEach((key) => {
      data.append(key, input[key]); 
    });

    try {
      const response = await axios.post(api, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      message.success("Book Inserted Successfully");
      navigate("/dashboard/display");
    } catch (error) {
      console.error('Error uploading data:', error);
      message.error("Failed to insert book. Please try again.");
    }
  };

  return (
    <>
      <div className='image'>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingLeft: "100px", paddingTop: "50px"}}>
          <div style={{ width:"800px",alignItems: "center", border: "2px solid black", borderRadius: "10px", alignContent: "center", padding: "40px" }} className='bg-gray-600 w-3/5'>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <label style={{ color: "black", fontWeight: "500", fontSize: "20px", fontFamily: "sans-serif" }} htmlFor="name">Enter your name</label>
                <input type="text" style={{ width: "50%", borderRadius: "5px" }} name="name" value={input.name || ''} onChange={handleInput} />
              </div>
              <br />
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <label style={{ color: "black", fontWeight: "500", fontSize: "20px", fontFamily: "sans-serif" }} htmlFor="price">Enter your price</label>
                <input type="text" style={{ width: "50%", borderRadius: "5px" }} name="price" value={input.price || ''} onChange={handleInput} />
              </div>
              <br />
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <label style={{ color: "black", fontWeight: "500", fontSize: "20px", fontFamily: "sans-serif" }} htmlFor="description">Enter your Description</label>
                <input type="text" style={{ width: "50%", borderRadius: "5px" }} name="description" value={input.description || ''} onChange={handleInput} />
              </div>
              <br />
 <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <label style={{ color: "black", fontWeight: "500", fontSize: "20px", fontFamily: "sans-serif" }} htmlFor="category">Number of category</label>
                <input type="text" style={{ width: "50%", borderRadius: "5px" }} name="category" value={input.category || ''} onChange={handleInput} />
              </div>
              <br />
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <label style={{ color: "black", fontWeight: "500", fontSize: "20px", fontFamily: "sans-serif" }} htmlFor="file">Upload Image</label>
                <input type="file" style={{ width: "50%", borderRadius: "5px" }} name="file" onChange={handleFileChange} />
              </div>
              <br />
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <button type="submit" style={{ border: "2px solid black", borderRadius: "5px", padding: "5px", backgroundColor: "darkgray" }}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Insert;