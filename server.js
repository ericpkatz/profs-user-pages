const express = require('express');
const app = express();
const path = require('path');
const { syncAndSeed, models } = require('./db');
const { User, Page } = models;

const port = process.env.PORT || 3000;


app.listen(port, ()=> console.log(`listening on port ${port}`));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));


app.get('/api/users', async(req, res, next)=> {
  try{
    res.send(await User.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/users/:id', async(req, res, next)=> {
  try{
    res.send(await User.findByPk(req.params.id, { include: [ Page ]}));
  }
  catch(ex){
    next(ex);
  }
});

syncAndSeed();
