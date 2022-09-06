var Userdb = require('../model/model');
const express = require('express')
const axios = require('axios');
const app = express();
const fs = require('fs');
require('dotenv/config')

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const SERVICE_ID = process.env.SERVICE_ID;

const client = require('twilio')(accountSid, authToken);
exports.create = (req, res) => {

    if (!req.body) {
        res.status(400).send({ message: "Content can't be empty!" });
        return;
    }
    const user = new Userdb({
        aadhar: req.body.aadhar,
        phone_no: req.body.phone_no,
        name: req.body.name,
        pan_number: req.body.pan_number,
        bank_name:req.body.bank_name,
        aadhar_linked_account: req.body.aadhar_linked_account,
        email: req.body.email,
        v_status: req.body.v_status,
        gender: req.body.gender

    });

    user
        .save(user)
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({ message: err.message || "Some error occured during creation of user" });
        })
}
/* 
exports.find = (req, res) => {

    Userdb.find()
        .then(user => {
            // res.redirect("/verify");
            res.send(user);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}
 */

exports.update = async (req, res) => {
    
    const aadhar_r = req.body.aadhar;
    const data_obj = await Userdb.findOne({aadhar: aadhar_r});
    
    
    const phone_no_local = '+' + data_obj.phone_no;

    // Send OTp
    //Working Un comment below 
     /*  client.verify.v2.services(SERVICE_ID)
        .verifications
        .create({ to: phone_no_local, channel: 'sms' })
        .then(verification => {
            console.log(verification.sid)
        }); 
  */
        res.cookie("aadhar_r", aadhar_r, {
            expires:new Date( Date.now() + 60*60*1000 ), // set  for 1 hour set 10 for 10 mins in first 60
            httpOnly:true
        }).status(200).redirect('/api/users/verify')

}//working

exports.verify = async (req, res) => {

    console.log("aadhar="+req.cookies.aadhar_r);
    const data = await Userdb.findOne({aadhar: req.cookies.aadhar_r});
    const phone_no = data.phone_no;
    console.log(phone_no);
//Working
        client.verify.v2.services(SERVICE_ID)
            .verificationChecks
            .create({ to: `+${phone_no}`, code: `${parseInt(req.body.otp)}` }) //89
            .then(verification_check => {
                console.log(verification_check.status)
                if (verification_check.status == 'approved') {
                    if(data.college_name == null){
                        res.redirect('../../new_student_data');
            
                    }else{
                        res.redirect('../../student_data');
                    }
                }else{
                    res.render('verify', {
                        isError: true
                    })
                }
            });
    

   const status = 'approved'; 
   if(status == 'approved'){
    if(data.college_name == null){
        res.redirect('../../new_student_data');
    
    }else{
        res.redirect('../../student_data');
    }
    }else{
    res.render('verify', {
        isError: true
    })
    }
   }

 
//working

exports.sendAdminRequest = async (req, res) =>{
    
    //console.log("field="+req.cookies.field);
    const change_on = req.cookies.field;
    const request= req.body.cmntxt;
    const image=req.body.cmnimg;    
    const aadhar = req.cookies.aadhar_r; // When ask for data not found ,render data .
    const users = await Userdb.find();

    // console.log(typeof change_on);
    // console.log(request);
    // console.log(image);
console.log("In Admin");
   // console.log(req.cookies);
   //-------------------------------------------------------------
/* 
   var error = false
   var aadhar_d = []
   var panNo = []
console.log("Request="+request);
   if(req.cookies.field == 'aadhar'  || req.cookies.field =='pan_number'){

        aadhar_d = await Userdb.find({aadhar : parseInt(request)})
        panNo = await Userdb.find({pan_number : parseInt(request)})
        console.log("aadhar_d="+aadhar_d);
   }

    if(panNo.length >= 1 && aadhar_d.length >= 1) {
        error = true
    }

    console.log(error);
 */
    console.log(aadhar);
        Userdb.findOneAndUpdate({aadhar},{

            $push:{
                request:{
                    field: change_on,
                    value: request
                }   
            }

        }, { upsert:true },
        (err) => {
            if(err) {
                console.log(err);
            }
            else{
                console.log("request sent");
            }
        });

        //   console.log("Updated Data:"+data);




//-------------------------------------------------

    // console.log(data);
    console.log(users);
res.render('admin_req_list', {
    users
});
    
}

exports.letterprint =(req,res) =>{
    res.render('app');
}

exports.delete =(req,res) =>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then()(data =>{
            if(!data){
                res.status(404).send({message:'Cant delete with id ${id},maybe it is wrong'})
            }else{
                res.send({
                    message:"User was deleted"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({message:"User cant be deleted du to server issues"})
        })

}