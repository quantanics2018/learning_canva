const express = require('express');
const app = express();
const authRouter = require('./Routes/auth');
const cors = require('cors');
const CodeRouter = require('./Routes/Code_run');
const Certificate_route = require('./Routes/Certificate');

app.use(express.json());
app.use(cors({ origin: '*'}));
app.use(express.static('upload_img')); // Serve static files from the 'uploads' directory
app.use('/upload_img', express.static('upload_img'));
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
app.use('/certificate',Certificate_route);

// server listening checking  function
// app.post('/certificate/bimg',(req,res)=>{
//   res.send(req.body);
//   console.log("its working fine to index.js file");
// });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
