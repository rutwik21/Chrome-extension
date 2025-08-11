const jwt = require('jsonwebtoken');
const usersSchema = require('../models/users');

// Register route
exports.signup = async (req, res) => {
  try {
    console.log(req.body)
    if(!req.body.email || !req.body.password ){
      return res.status(400).json({success: false, message: "Provide credentials"});
    }
    const { email, password, role } = req.body;
    
    // Check if user exists
    let user = await usersSchema.findOne({ email });
    if (user) return res.status(400).json({success: false, message: 'User already exists' });

    // Create new user
    user = new usersSchema({ email, password, role: (role || 'user') });
    await user.save();

    // Create JWT
    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({success: true, token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({success: false, message: "Something went wrong!"});
  }
};


exports.login = async(req, res)=>{

    try {
        if(!req.body.email || !req.body.password){
          return res.status(400).json({success: false, message: "Provide login credentials"});
        }
        const { email, password } = req.body;
    
        // Check if user exists
        const user = await usersSchema.findOne({ email: email });
        if (!user) return res.status(400).json({success: false, message: 'User not found' });
    
        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({success: false, message: 'Incorrect password' });
    
        // Create JWT
        const payload = { user: { id: user.id, role: user.role } };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
    
        return res.status(200).json({success: true, token, isadmin: user.role==='admin' });
        
      } catch (err) {
        console.error(err.message);
        return res.status(500).json({success: false, message: "Something went wrong!"});
      }

}
