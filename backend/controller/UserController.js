const User = require('../models/User')
const bcrypt = require('bcrypt')


const createUser = async (req, res) => {
    try {
        const { name, email, password, role, address } = req.body

        // Check if an admin already exists
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (role === 'admin' && existingAdmin){
        return res.status(400).json({ error: 'Admin user already exists' })      
      }

      if(!email || !password){
        return res.status(400).json({ error: 'Invalid username and password' })
      }
       // generate salt;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({name:name, email:email,password:hashedPassword, role:role, address:address})
        const response = await newUser.save()
        console.log(response)
        res.status(201).json({message:'User Registered Successfully'});
    } catch (error) {
         console.log(error);
        res.status(500).json({ error: "internal server error" })
    }
}

module.exports={createUser}