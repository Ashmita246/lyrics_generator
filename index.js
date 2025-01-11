const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    console.log('working fine'); 
  res.send('working fine');
});

app.get('/healths',(req,res)=>{
    res.send("api health is good");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});
