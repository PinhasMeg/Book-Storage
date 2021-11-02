//const bodyParser = require('body-parser');
const express= require('express');
const app=express();
require('./models/dbConfig')
const postsRoutes=require('./routes/postController');
const bodyParser=require('body-parser');

app.use(bodyParser.json());
app.use('/posts',postsRoutes);
app.listen(5500,()=>console.log('server started:5500'));
//ok