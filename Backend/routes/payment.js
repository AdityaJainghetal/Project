const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const paymentModel = require("../models/payment");
const axios = require("axios");




// Create QR Code
router.post("/qr-code", async (req, res) => {
    const { amount } = req.body; // Amount should be in smallest currency unit (e.g., paise)

    try {
        const response = await axios.post(
            `https://api.razorpay.com/v1/qr-codes`,
            {
                amount: amount * 100, // Convert to paise
                currency: "INR",
                type: "single", // or "multiple"
            },
            {
                auth: {
                    username: process.env.KEY_ID,
                    password: process.env.KEY_SECRET,
                },
            }
        );

        res.status(200).json({ qrCode: response.data });
    } catch (error) {
        console.error("Error creating QR code:", error.response ? error.response.data : error.message);
        res.status(500).json({ message: "Something went wrong!" });
    }
});



// Creating Order
router.post("/orders", async (req, res) => {
    try {
        const { amount, productitems, name, address, mobile, pincode } = req.body;

        // Validate the request body
        if (!amount || !productitems || !name || !address || !mobile || !pincode) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        });

        const options = {
            amount: amount * 100, // amount in paise
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        instance.orders.create(options, async (error, order) => {
            if (error) {
                console.error("Error creating order:", error);
                return res.status(500).json({ message: "Something went wrong!" });
            }

            // Save payment details to the database
            const mypayment = new paymentModel({
                name: name,
                address: address,
                mobile: mobile,
                pincode: pincode,
                productitems: productitems,
                totalproductprice: amount,
                dop: new Date(),
                status: true,
                orderId: order.id, // Save the order ID for future reference
            });

            await mypayment.save();

            res.status(200).json({ data: order });
        });
    } catch (error) {
        console.error("Error in /orders:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

// Verifying the payment
router.post("/verify", async (req, res) => {
    try {
        const { razorpay_orderID, razorpay_paymentID, razorpay_signature } = req.body;

        // Validate the request body
        if (!razorpay_orderID || !razorpay_paymentID || !razorpay_signature) {
            return res.status(400).json({ message: "Missing required fields!" });
        }

        const sign = razorpay_orderID + "|" + razorpay_paymentID;
        const resultSign = crypto
            .createHmac("sha256", process.env.KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === resultSign) {
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ message: "Payment verification failed" });
        }
    } catch (error) {
        console.error("Error in /verify:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

module.exports = router;