const StuModel =require("../models/studentModel");


const dataSave = async (req, res) => {
    const { name, price, description,category } = req.body;

    try {
        const book = await StuModel.create({
            name: name,
            price: price,
            description: description,
            category: category,
            image: req.file.path // Use the Cloudinary URL
        });

        res.status(201).json(book); // Send back the created book
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error saving data", error });
    }
};


const dataSearch =async(req, res)=>{
    const {name} =req.body;
    const mydata = await StuModel.find({ name: new RegExp(name, 'i') });
    res.send(mydata);
}


const deleteDataDisplay=async(req, res)=>{
    const Data= await  StuModel.find();
    res.send(Data);
}



const recordDelete=async(req, res)=>{
 const {myid} = req.body;
 const myRes= await StuModel.findByIdAndDelete(myid);
 res.send(myRes);
}


const dataDisplay= async(req,res)=>{
    const myData = await StuModel.find();
    res.send(myData)
}

const editDisplay =async(req,res)=>{
    const{id} =req.query;
    const Data = await StuModel.findById(id);
    res.send(Data);
}


const editDataSave = async(req,res)=>{
    const{id, _id,name,price,description,category} =req.body;

    const myres= await StuModel.findByIdAndUpdate(id,{
        name:name,
        price:price,
        description: description,
        category: category,
    })
    res.send("Ok")
}

module.exports={
    dataSave,
    dataDisplay,
    dataSearch,
    deleteDataDisplay,
    recordDelete,
    editDisplay,
    editDataSave

}