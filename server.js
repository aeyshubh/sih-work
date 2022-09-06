const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const { read } = require('fs');
const connectdb = require('./server/database/connection');
var cookieParser = require('cookie-parser');

app.use(cookieParser());


dotenv.config({path:'config.env'})
const PORT = process.env.PORT;
console.log(PORT);
//log entries
app.use(morgan('tiny'))
app.use(bodyparser.urlencoded({extended:true}));

connectdb();

app.set("view engine","ejs"); //can be HTML too for setting views 
//load assets

//Don't keep them empty 
app.use('/css',express.static(path.join(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));
app.use('/vendor',express.static(path.resolve(__dirname,"assets/vendor")));
//app.use('/student_update_data',express.static(path.resolve(__dirname,"views/student_update_data")));

app.use('/',require('./server/routes/router'));

app.use((req, res, next) => {
    res.status(400).render('page_404');

});
  

app.listen(PORT,()=>{
    console.log("server is running on localhost")
;});