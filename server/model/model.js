const mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        aadhar:{ 
            type:Number,
            require:true,
            unique:true
        },
        pan_number:{
            type:String,
            unique:true
        },
        phone_no:Number,
        name:String,
        bank_name:String,
        aadhar_linked_account:Number,
        email:String,
        college_name:String,
        aicte_id:Number,
        role:String,    
        gender:String,
        request:[
            {
                field: String,
                value: String,
                status:{
                    default:"pending",
                    type:String
                }
            }
        ],
        v_status:String

    }
)

const Userdb = mongoose.model("AICTEData",schema);
module.exports = Userdb;
