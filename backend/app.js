const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

dotenv.config();  

const app = express();
app.use(cors(
  {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }

));
app.use(bodyParser.json());

const authRoutes = require('./route/authRoutes');


const JWT_SECRET = 'change_this_in_production';
// In-memory store (demo). Replace with DB in production.
const users = {}; // email -> { passwordHash, remainingRequests, id }

function generateToken(email){
  return jwt.sign({email}, JWT_SECRET, {expiresIn:'7d'});
}

app.use('/api/auth', authRoutes)

// app.post('/auth/signup', async (req,res)=>{
//   const {email,password} = req.body;
//   if(!email||!password) return res.status(400).json({message:'missing'});
//   if(users[email]) return res.status(400).json({message:'user exists'});
//   const hash = await bcrypt.hash(password, 10);
//   users[email] = { passwordHash: hash, remainingRequests: 10, id: Date.now().toString() };
//   const token = generateToken(email);
//   return res.json({token});
// });

// app.post('/auth/signin', async (req,res)=>{
//   const {email,password} = req.body;
//   if(!email||!password) return res.status(400).json({message:'missing'});
//   const u = users[email];
//   if(!u) return res.status(400).json({message:'invalid'});
//   const ok = await bcrypt.compare(password, u.passwordHash);
//   if(!ok) return res.status(400).json({message:'invalid'});
//   const token = generateToken(email);
//   res.json({token});
// });

// app.get('/auth/me', (req,res)=>{
//   const auth = req.headers['authorization']||'';
//   const token = auth.split(' ')[1];
//   if(!token) return res.status(401).json({message:'no token'});
//   try{
//     const decoded = jwt.verify(token, JWT_SECRET);
//     const u = users[decoded.email];
//     if(!u) return res.status(401).json({message:'no user'});
//     return res.json({email: decoded.email, remainingRequests: u.remainingRequests});
//   }catch(e){
//     return res.status(401).json({message:'invalid token'});
//   }
// });

// // Generate comment endpoint - consumes 1 request from user's quota
// app.post('/generate-comment', (req,res)=>{
//   const auth = req.headers['authorization']||'';
//   const token = auth.split(' ')[1];
//   if(!token) return res.status(401).json({message:'no token'});
//   try{
//     const decoded = jwt.verify(token, JWT_SECRET);
//     const u = users[decoded.email];
//     if(!u) return res.status(401).json({message:'no user'});
//     if(u.remainingRequests <= 0) return res.status(403).json({message:'no remaining requests'});
//     const caption = (req.body && req.body.caption) || '';
//     // Simulate AI generation. Replace this with real LLM API call.
//     const comment = makeCommentFromCaption(caption);
//     u.remainingRequests -= 1;
//     return res.json({comment});
//   } catch(e){
//     return res.status(401).json({message:'invalid token'});
//   }
// });

// function makeCommentFromCaption(caption){
//   const trimmed = (caption || '').trim();
//   if(!trimmed) return "Great post! Thanks for sharing.";
//   // Simple heuristics: use first sentence and append compliment
//   const first = trimmed.split(/\.|!|\?/)[0];
//   let result = `Great post — ${first.trim()}. I especially liked your points about ${first.split(' ').slice(0,6).join(' ')}.`;
//   if(result.length > 280) result = result.slice(0, 280);
//   return result;
// }

const PORT = process.env.PORT || 4000;
app.listen(PORT, async ()=> {
  const con = require('./connection');
  await con.connectDB();
  console.log('Server running on', PORT)
});