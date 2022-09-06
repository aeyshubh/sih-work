const express = require('express');
const route = express.Router()
const controller = require('../controller/controller')
const axios = require('axios');
var Userdb = require('../model/model');

route.get('/',(req,res)=>{
    res.render('login');
});

route.get('/login',(req,res)=>{
    res.render('login');
});

route.get('/api/users/verify',(req,res)=>{
    if(req.cookies.aadhar_r){
    res.render('verify',{
        isError:false
    });
}else{
    res.render('index');
}
});

route.post('/api/users/updateVerification',async (req,res)=>{
    const college_name = req.body.college_name;
    const role = req.body.role;
    console.log(college_name);
    console.log(role);
    if(req.cookies.aadhar_r){
    const aadhar = req.cookies.aadhar_r;
    const data = await Userdb.findOneAndUpdate({aadhar}, {// When in runtime with oth set req.aadhar' insted og data
        $set:{
            v_status:"True",
            college_name:college_name,
            role:role 

        }
    })
    res.redirect('../../student_data');// To make a logic use redirect and for just rendering pages use render 
}else{
res.render('index');
}
}

);


route.get('/student_data', async (req, res)=>{
   
    if(req.cookies.aadhar_r){
     
    const aadhar = req.cookies.aadhar_r;
    const data = await Userdb.findOne({ aadhar});
    // console.log(data);
    res.render('student_data', {
        data
    });  
    }else{
        res.render('index');
    }
});

route.get('/new_student_data', async (req, res)=>{
   
    if(req.cookies.aadhar_r){
     
    const aadhar = req.cookies.aadhar_r;
    const data = await Userdb.findOne({ aadhar});
    // console.log(data);
    res.render('new_student_data', {
        data
    });  
    }else{
        res.render('index');
    }
});


route.get('/Letter',async (req,res)=>{
    const aadhar = req.cookies.aadhar_r;
    const data = await Userdb.findOne({ aadhar});
    // console.log(data);
    res.render('Letter', {
        data
    });

})

//Updation Routes -->
route.get('/student_data_upd' , async (req,res) =>{
    if(!req.cookies.aadhar_r){
        res.render('page_404');
    }else{
        const selected_val="aadhar";
        res.cookie("field", selected_val, {
            expires:new Date( Date.now() + 60*60*1000 ), // set  for 1 hour //Minutes-/seconds/mili
            httpOnly:true
        }).redirect('/student_data_upd-render');
       // res.render('student_data_upd');
    }
})


route.get('/student_data_upd-render', (req, res) => {
    res.render('student_data_upd');
}) //create all other end points 


route.get('/student_upd_name', async(req,res) =>{
    const selected_val="name";
    res.cookie("field", selected_val, {
        expires:new Date( Date.now() + 60*60*1000 ), // set  for 1 hour
        httpOnly:true
    }).redirect('/student_upd_name-render'); // For API endpoints calling
})

route.get('/student_upd_name-render', (req, res) => {
    res.render('student_upd_name');
}) //create all other end points 

route.get('/student_upd_bank', async(req,res) =>{
    const selected_val="bank_name";
        res.cookie("field", selected_val, {
            expires:new Date( Date.now() + 60*60*1000 ), // set  for 1 hour
            httpOnly:true
        }).redirect('student_upd_bank-render');

})

route.get('/student_upd_bank-render', (req, res) => {
    res.render('student_upd_bank');
}) //create all other end points 

route.get('/student_upd_bankno', async(req,res) =>{
    const selected_val="aadhar_linked_account";
        res.cookie("field", selected_val, {
            expires:new Date( Date.now() + 60*60*1000 ), // set  for 1 hour
            httpOnly:true
        }).redirect('student_upd_bankno-render');

})

route.get('/student_upd_bankno-render', (req, res) => {
    res.render('student_upd_bank');
})

route.get('/student_upd_pan', async(req,res) =>{
    const selected_val="pan_number";
        res.cookie("field", selected_val, {
            expires:new Date( Date.now() + 60*60*1000 ), // set  for 1 hour
            httpOnly:true
        }).redirect('student_upd_pan-render');

})

route.get('/student_upd_pan-render', async (req, res) => {
    res.render('student_upd_bank');
})

route.get('/update-user/:user/:request_id', async (req,res)=>{
    const user = req.params.user;
    const request_id = req.params.request_id;
    const isUserExist = await Userdb.findOne({_id:user})
    console.log("Exp="+isUserExist.request[0].field);
    console.log("Exp="+isUserExist.request[0].value);
    

    if(isUserExist){
        //console.log(typeof isUserExist);

        const arrayData = isUserExist.request.filter(data => {
            return data._id == request_id // id passed by the button after clicking 
        })

        console.log("Array data main"+arrayData[0].field);
        var value = arrayData[0].value;
        const field = arrayData[0].field;

        console.log(value+'-----+----'+field);

        if(field == "aadhar") {
            value = parseInt(arrayData[0].value)
            Userdb.findOneAndUpdate({_id:user},{

                $set:{
                    aadhar: value  
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
        }
        if(field == "bank_name") {
            Userdb.findOneAndUpdate({_id:user},{

                $set:{
                    bank_name: value  
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
        }

        if(field == "aadhar_linked_account") {
            value = parseInt(arrayData[0].value)
            Userdb.findOneAndUpdate({_id:user},{

                $set:{
                    aadhar: value  
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
        }


        const status = "approved"
//name bank bank account_no aadhar pan_number
        



    }

   res.send('200');

});


route.get('/update_user_college', async(req,res)=>{res
    const aadhar = req.cookies.aadhar_r;
    const user = await Userdb.findOne({ aadhar});
    // console.log(data);
    res.render('update_user_college', {
        user
    });
})

route.get('/admin_req_list' , async(req,res) =>{
res.render('admin_req_list');
})

route.get('/admin_request', async(req,res) =>{
    const aadhar = req.cookies.aadhar_r;
    const user = await Userdb.findOne({aadhar});
    res.render('admin_request' ,{
        user
    });
})


route.get('/dummy', async (req,res) =>{
    console.log(req.cookies);
})

route.post('/updateCollege',async(req,res) =>{
    
})

route.get('/api/users/letterprint/', controller.letterprint);
route.post('/api/users/create',controller.create);
route.post('/api/users/',controller.update);
route.post('/api/users/verify',controller.verify);
//route.post('/api/users/find',controller.find);
route.post('/api/users/update',controller.sendAdminRequest);
route.delete('/api/users/delete',controller.delete);
module.exports = route;