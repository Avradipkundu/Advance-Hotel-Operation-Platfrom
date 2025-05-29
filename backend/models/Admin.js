const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name:{
     type:String,
     required: true
  },   
  password: {
        required: true,
        type: String        
    },
  role: { 
    type: String,    
    default: 'admin',
    required: true
},
  address: {type:String}
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
