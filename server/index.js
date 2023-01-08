const express = require('express')
const app = express();
var path = require('path');
const fs = require('fs');
const userTable = __dirname+'/static/data.json';
const collectData = [];
port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//
const cors = require('cors')
app.use(cors())
//
// app.use(express.static('static'));
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/static/index.html');
  });
  
  /** Process POST request */

  app.post('/add', function (req, res) {
    console.log('got it')
    const {name, email, password} = req.body;
    console.log("req.body=>",req.body)
    const userData = {
      name : name,
      email : email,
      password : password
    }
    if(fs.existsSync(userTable)){
      fs.readFile(userTable  ,"utf-8" ,(error , dbData)=>{
        if(dbData.length > 0){
            const preData = JSON.parse(dbData);
            console.log("preData",preData)
            const existingData = preData.filter((data)=>data.email === req.body.email);
            console.log("existingData",existingData)
            console.log("existingData.length",existingData.length)
            if(existingData.length > 0){
              // if(Object.keys(existingData[0]).length > 0){
              res.status(409).send('User already exist'+" "+ existingData[0].email+ ' Please Login');
            }else{
              preData.push(userData);
              fs.writeFile(userTable , JSON.stringify(preData),'utf8',(error)=>{
                if(error){
                  console.log(error)
                }else{
                  res.send('user added'+" " +userData.email+'.')
                }
              })
            }
        }else{
          collectData.push(userData);
          fs.writeFile(userTable,JSON.stringify(collectData),'utf-8',(error)=>{
            if(error){
              console.log(error);
            }else{
              res.send(`User added ${email}`);
              // res.json({msg:"User has been added.",result:data})
            }
          });
        }
      })
    }
    
    
    // fs.readFile(userTable, 'utf8', (error, data) => {
    //   if(!(error)){
    //     if(data.length > 0){
    //       const preData = JSON.parse(data);
    //       if(preData.length > 0){
    //         preData.push(userData);
    //         fs.writeFile(userTable, JSON.stringify(preData), 'utf8' ,(error) => {
    //           if(error){
    //             console.log(error);
    //           }else{
    //             res.status(200).send(`User added ${email}.`);
    //           }
    //         });
    //       }
    //     }else
    //     {
    //       collectData.push(userData);
    //       fs.writeFile(userTable,JSON.stringify(collectData),'utf-8',(error)=>{
    //         if(error){
    //           console.log(error);
    //         }else{
    //           res.send(`User added ${email}`);
    //           // res.json({msg:"User has been added.",result:data})
    //         }
    //       });

    //     }
    //   }
    // })
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // res.send(`test : ${userData}`);
  //   // console.log("data",data)
  //   collectData.push(data);
  //   // console.log("collectData",collectData)
  //  fs.writeFile(userTable,JSON.stringify(collectData),'utf-8',(error)=>{
  //   if(error){
  //     console.log(error);
  //   }else{
  //     // res.send('user added' +data[0].email+'.');
  //     res.json({msg:"User has been added.",result:data})
  //   }
  //  })






























//{req.method}
// app.get('/', function (req, res) {
//     // console.log(req.method);
//     res.send("Hello from the server");
//     });

//{req.body}

// app.get('/', function (req, res) {
//     var data = req.body;

//     console.log("Name: ", data.name);
//     console.log("Age: ", data.age);
//     console.log("Gender: ", data.gender);

//     res.send();
// });



// use {request.params}
// app.get('/:name', (req, res) => {
//     res.send('Your name is ' + req.params.name + '\n');
// });


// {res.sendFile}
// res.send('hello from server')

//     option = {root:path.join(__dirname)}

// var fileName = 'Hello.txt';
// res.sendFile(fileName , option, function (err) {
//     if (!err) {
//         console.log('Sent:', fileName);
//         console.log(path.join(__dirname,'Hello.txt'));

//     } else {
//         next(err);
//     }
// });



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

