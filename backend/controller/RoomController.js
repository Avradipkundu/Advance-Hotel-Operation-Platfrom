const fs = require('fs')
const Room = require('../models/Room.js')
const Admin = require('../models/Admin.js')

const allRooms = async (req, res) => {
    try {
        const data = await Room.find()
        console.log("data fetched")
        console.log(data)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
}
// get record by id
const roomById = async (req, res) => {
    try {
        const roomId = req.params.id
        const data = await Room.findById(roomId)
        if(!data){
        res.status(404).json("error: room not found")
        }
        console.log("data fetched")
        console.log(data)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
}

const addRooms = async (req, res) => {
    try {
        const { roomNo, name, type, price, features, description } = req.body
        const image = req.file ? req.file.filename : null;
        const room = new Room({ roomNo, image, name, type, price, features, description })
        await room.save();
        console.log(room)
        res.status(201).json(room);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" })
    }
}

const updateRooms = async (req, res) => {
    try {
        const roomId = req.params.id
        const updateData = { ...req.body };
        const admin = req.user.id
        const user = await Admin.findById(admin)
        if(!(user.role === 'admin')){
            return res.status(400).json({ error: 'user does not have admin role' })
        }
        if (req.file) {
            updateData.image = req.file.filename; // ✅ Add the image filename to the update
        }
        const room = await Room.findByIdAndUpdate(roomId, updateData, {
            new: true
        })
        if (!room) {
            res.status(404).json({error: "user not find"})
        }
        console.log("data updated");
        res.status(200).json(room)
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
}

const deleteRooms = async (req, res) => {
    try {
        const roomId = req.params.id
        const room = await Room.findByIdAndDelete(roomId)
        const admin = req.user.id
        const user = await Admin.findById(admin)
        if(!(user.role === 'admin')){
            return res.status(400).json({ error: 'user does not have admin role' })
        }
        if (!room) {
            res.status(404).json({error: "room not found"})
        }
        const userPhotoInfo = room.image;
        if (userPhotoInfo) {
            fs.unlinkSync("uploads/" + userPhotoInfo);
        }
        console.log("data deleted");
        res.status(200).json({ message: "record deleted successfully" })
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    allRooms,
    roomById,
    addRooms,
    updateRooms,
    deleteRooms,
}

