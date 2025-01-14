import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useDispatch } from 'react-redux';
import { addtocart } from '../cartSlice';
import Silder from './Silder';






const Home = () => {
  const [data, setData] = useState([]);

  const dispatch =  useDispatch();
  
  const loadData = async () => {
    
      // const api = "http://localhost:3000/components";
      const api= "http://localhost:8000/employer/datadisplay"
      const res = await axios.get(api);
      setData(res.data);
   
    
  };


  // const loadData=()=>{
  //   let api= "http://localhost:8000/employer/datadisplay";
  //   axios.get(api).then((res)=>{
  //     setData(res.data);
  //     console.log(res.data);
      
  //   })
  // }

  useEffect(() => {
    loadData();
  }, []);


  const cards = data.map((key) => {
    return (
    


      <Card  style={{ width: '18rem', marginTop: '50px' }}>
        <Card.Img variant="top" style={{height:"250px"}} src={key.image} alt={key.name} />
        <Card.Body>
          <Card.Title>{key.name}</Card.Title>
          <Card.Text>
           {key.category}
          </Card.Text>
          <Card.Text>
           {key.description}
          </Card.Text>
          <Button variant="primary" onClick={()=>{dispatch(addtocart(key))}}>Add to cart</Button>
        </Card.Body>
      </Card>
    );
  });

  return (

     <div >
      
      <Silder/>
   
         

   


 
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
    
     <br />
      {cards}
    </div>
    </div>
  
  
  );
};



export default Home;
