const Staff = require('../models/Staff.js')
const Admin = require('../models/Admin.js')
const User = require('../models/User.js')

const allStaffs = async (req, res) => {
    try {
        const user = req.user.id        
        const adminData = await Admin.findById(user)
        if (!adminData) {
            return res.status(403).json({ error: "Unauthorized access" });
        }
        const data = await Staff.find().populate('room')
        console.log("data fetched")
        console.log(data)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const availableStaffs = async (req, res) => {
    try {
        const userId = req.user.id;
        const userData = await User.findById(userId)
        if (!userData) {
            return res.status(403).json({ error: "Unauthorized access" });
        }
        const data = await Staff.find({status: "available"})
        console.log("data fetched")
        console.log(data)
        res.status(200).json(data)
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}

const addStaff = async (req, res) => {
    try {
        const admin = req.user.id
        const { name, no } = req.body
        const adminData = await Admin.findById(admin)
        if (!(adminData.role === 'admin')) {
            return res.status(403).json({ error: "Unauthorized access" });
        }
        if (!no) {
            return res.status(404).json({ error: "staff no invalid" })
        }
        const staff = new Staff({ name: name, no: no })
        await staff.save()
        console.log(staff)
        res.status(201).json(staff);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" })
    }
}
const updateStaff = async (req, res) => {
    try {
        const staffId = req.params.id
        const updateData = {...req.body};
        const admin = req.user.id
        const user = await Admin.findById(admin)
        if (!(user.role === 'admin')) {
            return res.status(400).json({ error: 'user does not have admin role' })
        }
        if (!updateData.no) {
            return res.status(404).json({ error: "staff no invalid" })
        }
        const staff = await Staff.findByIdAndUpdate(staffId, updateData, {
            new: true
        })
        if (!staff) {
            res.status(404).json({ error: "staff not found" })
        }
        console.log("data updated");
        res.status(201).json(staff);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" })
    }
}
const deleteStaff = async (req, res) => {
    try {
        const staffId = req.params.id
        const staff = await Staff.findByIdAndDelete(staffId)
        const admin = req.user.id
        const user = await Admin.findById(admin)
        if (!(user.role === 'admin')) {
            return res.status(400).json({ error: 'user does not have admin role' })
        }
        if (!staff) {
            console.log('staff not found')
            return res.status(404).json({ error: "staff not found" })
        }        
        console.log("data deleted");
        res.status(200).json({ message: "record deleted successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    allStaffs,
    availableStaffs,
    addStaff,
    updateStaff,
    deleteStaff
}