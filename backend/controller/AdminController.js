const { generateToken } = require('../middleware/authUser.js');
const Admin = require('../models/Admin.js')
const bcrypt = require('bcrypt')

const registerAdmin = async (req, res) => {
    try {
        const { name, password } = req.body

        if (!name || !password) {
            return res.status(400).json({ error: 'Invalid username and password' })
        }

        // Check if an admin already exists
        const existingAdmin = await Admin.findOne({ role: 'admin' });

        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin user already exists' })
        }        
       
        // generate salt;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const admin = new Admin({ name: name, password: hashedPassword })

        //save the new admin to the database
        const response = await admin.save()
        console.log(response)
        res.status(201).json({ message: 'Admin Registered Successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" })
    }
}

const loginAdmin = async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await Admin.findOne({ name });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = {
      id: user._id,
      role: user.role
    }
    console.log(JSON.stringify(payload))
    const token = generateToken(payload);
    console.log("Token is: ", token);

    // return token as response
    res.status(201).json({ token: token })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" })
  }
}


module.exports = {
    registerAdmin,
    loginAdmin
}
