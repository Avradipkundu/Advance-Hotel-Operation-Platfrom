const fs = require('fs')
const Room = require('../models/Room.js')

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

const addRooms = async (req, res) => {
    try {
        const { roomNo, name, type, price, features, description } = req.body
        const image = req.file ? req.file.filename : null;
        const room = new Room({ roomNo, image, name, type, price, features, description })
        await room.save();
        console.log(room)
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" })
    }
}

const updateRooms = async (req, res) => {
    try {
        const userId = req.params.id
        const updateData = { ...req.body };
        if (req.file) {
            updateData.image = req.file.filename; // ✅ Add the image filename to the update
        }
        const user = await Room.findByIdAndUpdate(userId, updateData, {
            new: true
        })
        if (!user) {
            res.status(404).json("error: user not find")
        }
        console.log("data updated");
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
}

const deleteRooms = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await Room.findByIdAndDelete(userId)

        if (!user) {
            res.status(404).json("error: user not find")
        }
        const userPhotoInfo = user.image;
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
    addRooms,
    updateRooms,
    deleteRooms,
}

