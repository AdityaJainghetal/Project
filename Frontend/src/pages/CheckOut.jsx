import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from "axios";

const CheckOut = () => {
    const [input, setInput] = useState({});
    const [qrCode, setQrCode] = useState(null);
    const [loader,setLoader]=useState(false)
    const cartData = useSelector((state) => state.cart);
    let totalAmount = 0;
    let productDetails = "";
    cartData.forEach((item) => {
        totalAmount += item.price * item.qnty;
        productDetails += `${item.name} qty - ${item.qnty} rate - ${item.price}\n`;
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((values) => ({ ...values, [name]: value }));
    };

    const handlePay = async () => {
        setLoader(true)
        try {
            const orderURL = "http://localhost:8000/api/payment/orders";
            const { data } = await axios.post(orderURL, { amount: totalAmount, productitems: productDetails, ...input });
            setLoader(false)
            initPay(data.data);
        } catch (error) {
            console.log(error);
            setLoader(false)

        }
    };

    const generateQRCode = async () => {
        try {
            const qrCodeURL = "http://localhost:8000/api/payment/qr-code";
            const { data } = await axios.post(qrCodeURL, { amount: totalAmount });
            setQrCode(data.qrCode);
        } catch (error) {
            console.log(error);
        }
    };

    const initPay = (data) => {
        const options = {
            key: "rzp_test_o3vkPO5n8pMXdo",
            amount: data.amount,
            currency: data.currency,
            name: productDetails,
            description: "Payment for products",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const verifyURL = "http://localhost:8000/api/payment/verify";
                    await axios.post(verifyURL, response);
                } catch (error) {
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

    return (
        <>
            <center>
                <h1>Payment</h1>
                <h2>Enter Your Shipping Address</h2>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Enter Name:</td>
                                    <td><input type="text" name="name" value={input.name} onChange={handleInput} /></td>
                                </tr>
                                <tr>
                                    <td>Enter Address:</td>
                                    <td><input type="text" name="address" value={input.address} onChange={handleInput} /></td>
                                </tr>
                                <tr>
                                    <td>Enter Mobile No:</td>
                                    <td><input type="text" name="mobile" value={input.mobile} onChange={handleInput} /></td>
                                </tr>
                                <tr>
                                    <td>Enter Pin code:</td>
                                    <td><input type="text" name="pincode" value={input.pincode} onChange={handleInput} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td><h1>Net Payable Amount:</h1></td>
                                    <td><h1>{totalAmount}</h1></td>
                                </tr>
                                <tr>
                                    <td><button onClick={handlePay}>{ loader ? "Loading..." : "Pay Now!"}</button></td>
                                    <td><button onClick={generateQRCode}>Generate QR Code</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {qrCode && (
                    <div>
                        <h2>Scan this QR Code to pay:</h2>
                        <img src={qrCode.qr_code_url} alt="QR Code" />
                    </div>
                )}
            </center>
        </>
    );
};

export default CheckOut;