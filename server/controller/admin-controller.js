const User = require ("../models/user-model");
const Contacts = require("../models/contact-form-model");

 const getAllUsers = async(req,res) => {

    try {
        const users = await User.find({},{password:0});
        if(!users || users.length == 0 ){
            return res.status(404).json({msg:"no users"});
        }
        return res.status(200).json(users);
        
    } catch (error) {
        next(error);
    }
          
        
}

const getAllContacts = async (req,res) => {
    try {
        const contacts = await Contacts.find();
        if(!contacts || contacts.length ==0){
           return res.status(404).json({msg:"no contacts"});
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
}

const getUserById = async (req,res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({_id:id},{password:0});
        if(!user || user.length ==0){
           return res.status(404).json({msg:"no users"});
        }
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}


const updateUserById = async (req,res) => {
    try {
        const id = req.params.id;
        const updatedUser = req.body;
       const updatedUserData =  await User.updateOne({_id:id}, {$set: updatedUser});
       console.log("update USER DATA IS ------ " + updatedUserData);
        return res.status(200).json(updatedUserData);
    } catch (error) {
        next(error);
    }
}


const deleteUser = async (req,res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({_id:id});
        return res.status(200).json({msg:"User Deleted Successfully"});
    } catch (error) {
        next(error);
    }
}

const deleteContactById = async (req,res) => {
    try {
        const id = req.params.id;
        await Contacts.deleteOne({_id:id});
        return res.status(200).json({msg:"Contact Deleted Successfully"});
    } catch (error) {
        next(error);
    }
}
module.exports = {getAllUsers,getAllContacts,deleteUser, getUserById, updateUserById, deleteContactById};