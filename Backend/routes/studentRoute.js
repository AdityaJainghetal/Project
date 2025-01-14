const express = require("express");
const route = express.Router();
const stuController = require("../controllers/userStudent");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: "dgc7ltpg8", // Use environment variables
    api_key: "559138412476855",
    api_secret: "Cd8zVsoh2J_7zu3-pNPrepzJpoE",
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // The folder in Cloudinary where files will be stored
    },
});

// Initialize multer with Cloudinary storage
const upload = multer({ storage: storage });

route.post("/datasave", upload.single('file'), async (req, res) => {
    // Check if file was uploaded
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    // Call your controller function
    await stuController.dataSave(req, res);
});

route.get("/datadisplay", stuController.dataDisplay);
route.post("/datasearch", stuController.dataSearch);
route.get("/deleteddisplay", stuController.deleteDataDisplay);
route.post("/recordDelete", stuController.recordDelete);
route.get("/editdisplay", stuController.editDisplay);
route.post("/editsave", stuController.editDataSave);

module.exports = route;