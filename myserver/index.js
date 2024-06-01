const express = require('express');
const app = express();
const authRouter = require('./Routes/auth');
const cors = require('cors');
const CodeRouter = require('./Routes/Code_run');

app.use(express.json());
app.use(cors());

// Middleware to remove caching for all responses
app.use((req,res,next)=>{
  res.setHeader('Cache-Control','no-cache , no-store must-revalidate');
  res.setHeader('Pragma','no-cache');
  res.setHeader('Expires','0');

  next();
})

// Routes
app.use('/auth', authRouter);
app.use('/live', CodeRouter);

// server listening checking  function
// app.post('/auth',(req,res)=>{
//   res.send(req.body.user_data);
//   console.log("its working fine to index.js file");
// });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
