const Birthday = require('../models/birthdayModel');

//Add a new birthday
const addBirthday = async(req,res)=>{
    try{
        const {name,dob} = req.body;

        if(!name || !dob){
            return res.status(400).json({msg:"All fields are required"});
        }

        const newBirthday = new Birthday({name,dob});
        await newBirthday.save();

        res.status(201).json({msg:"Birthday added successfully"});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};

//get the birthdays from the database
const getBirthdays = async(req,res)=>{
    try{
        const birthdays = await Birthday.find();
        res.json(birthdays);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};

const deleteBirthday = async(req,res)=>{
    try{
        const id = req.params.id;
        await Birthday.findByIdAndDelete(id);
        res.json({msg:"Birthday deleted successfully"});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};

const updateDob = async(req,res)=>{
    try{
        console.log(req.body);
        const id = req.params.id;
        const date_of_birth = req.body.dob;
        console.log(date_of_birth);
        await Birthday.findByIdAndUpdate(id,{dob : date_of_birth});
        res.json({msg:"Date of birth updated successfully"});
    }   
    catch(err){
        res.status(500).json({error:err.message});
    }
}

module.exports = {addBirthday,getBirthdays,deleteBirthday,updateDob};
