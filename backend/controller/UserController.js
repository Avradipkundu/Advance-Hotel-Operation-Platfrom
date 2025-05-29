const { generateToken } = require('../middleware/authUser.js');
const User = require('../models/User.js')
const bcrypt = require('bcrypt')


const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if an admin already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' })
    }

    if (!email || !password) {
      return res.status(400).json({ error: 'Invalid username and password' })
    }
    // generate salt;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name: name, email: email, password: hashedPassword })
    const response = await newUser.save()
    console.log(response)
    res.status(201).json({ message: 'User Registered Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = {
      id: user._id,
      role:user.role
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

const myProfile = async(req,res)=>{
  try {
    const userData = req.user
    console.log("User data: ", userData);
    const userId = userData.id
    const user = await User.findById(userId) 
    res.status(200).json({ user });
    console.log(user)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" })
  }
}

module.exports = {
  createUser,
  loginUser,
  myProfile
}