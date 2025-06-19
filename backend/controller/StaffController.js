const Staff = require('../models/Staff.js')
const Admin = require('../models/Admin.js')

const addStaff = async (req, res) => {
    try {
        const { name, no } = req.body
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
        const updateData = { ...req.body };
        const admin = req.user.id
        const user = await Admin.findById(admin)
        if (!(user.role === 'admin')) {
            return res.status(400).json({ error: 'user does not have admin role' })
        }
        if (!no) {
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

module.exports = {
    addStaff,
    updateStaff
}