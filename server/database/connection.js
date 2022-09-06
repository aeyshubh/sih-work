const mongoose = require('mongoose');

const connectdb = async() =>{
    try{
        mongoose.connect('mongodb://localhost:27017/users',
    
).then(()=>{
    console.log("Connected");
}).catch((e) =>{
    console.log("No connection");
})
    }catch(err){

    }
}

module.exports = connectdb;