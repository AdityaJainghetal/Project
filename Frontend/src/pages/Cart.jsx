import { useSelector, useDispatch } from "react-redux";
import Table from 'react-bootstrap/Table';
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import {qntyIncrement, qntyDecrement, itemRemove} from "../cartSlice";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const MyCart=()=>{
    const cartData= useSelector((state)=>state.cart);
    const dispatch= useDispatch();
    const navigate=useNavigate();

    let totAmount=0;



    const initPay = (data) => {
      const options = {
        key : "rzp_test_pzkHWxo3sRdVQW",
        amount: data.amount,
        currency: data.currency,
        name: "myproduct.name",
        description: "my good t shirt",
        image:"myproduct.img",
        order_id: data.id,
        handler: async (response) => {
          try {
            const verifyURL = "https://localhost:8000/api/payment/verify";
            const {data} = await axios.post(verifyURL,response);
          } catch(error) {
            console.log(error);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    };
    
    const handlePay = async () => {
      try {
        const orderURL = "http://localhost:8000/api/payment/orders";
        const {data} = await axios.post(orderURL);
        console.log(data);
        initPay(data.data);
      } catch (error) {
        console.log(error);
      }
    };




    const MyData=cartData.map((key)=>{

      totAmount+=key.price*key.qnty;
        return(
            <>
              <tr>
                <td> <img src={key.image} width="100px" height="100px" /></td>
                <td>{key.name}</td>
                <td>{key.description}</td>
                <td>{key.category}</td>
                <td>{key.price}</td>
                <td> 
                  
                <FaMinusCircle onClick={()=>{dispatch(qntyDecrement({_id:key._id}))}} />



                  {key.qnty} 
                  <FaPlusCircle onClick={()=>{dispatch(qntyIncrement({_id:key._id}))}} />
                  
                  
                  </td>
                <td> {key.price * key.qnty} </td>
                <td> 

                  <button onClick={()=>{dispatch(itemRemove({_id:key._id}))}}> Remove</button>
                </td>
              </tr>
            </>
        )
    })
    return(
        <>
          <h1> Our Products </h1>   

          <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th>Decription</th>
          <th>Category</th>
          <th> Price </th>
          <th> QTY </th>
          <th> Total </th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
          {MyData}
        </tbody>
        <tr>
          <th>#</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th> Net Amount :  </th>
          <th> { totAmount} </th>
          <th></th>
        </tr>


       
        </Table>     


     <center>

     <button onClick={()=>{navigate("/checkout")}}>CheckOut</button> 
     {/* <button onClick={()=>handlePay()}>checkout</button> */}
     </center>
        
        </>
    )
}
export default MyCart;