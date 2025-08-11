const {
    Schema,
    model
  } = require("mongoose");
  const bcrypt = require('bcryptjs');

const usersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  role: {
    type: String,
    enum: ['admin', 'user']
  },
  plan:{
    type: String,
    default: 'free'
  },
}, { timestamps: true });

// Hash password before saving
usersSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
usersSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create and export the model
const Users = model('Users', usersSchema);
Users.countDocuments().then((count)=>{
  if(count === 0){
    Users.create({
      email: 'rutwik@truecopy.com',
      password: 'admin',
      role: 'admin'
    });
  }
});
module.exports = Users;