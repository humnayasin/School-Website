const express = require('express');
const path = require('path');
const port = 80; 
const bodyparser = require('body-parser');

//express specific

const app = express();
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//pug specific
app.set('view engine', 'pug')//set the template engine as pug
app.set('views' , path.join(__dirname, 'views'))//set the views directory

//mongoose
const mongoose = require('mongoose');
const { notDeepEqual } = require('assert');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactSchool');
}
//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    message: String
  
  });
  const Contact = mongoose.model('Contact', contactSchema);
//End points
app.get('/' , (req, res)=>{
   const params = {}
   res.status(200).render('home.pug' , params);
})
app.get('/contact' , (req, res)=>{
    res.status(200).render('contact.pug')
});
app.post('/contact' , (req, res)=>{
    var mydata = new Contact(req.body);
    mydata.save().then(()=>{
       
       
            res.send("message has been sent");
       
        
    
  
    }).catch(()=>{
        res.send("Error Occured! Message has not been sent");
    });

});
// start the server
app.listen(port, ()=>{
    console.log(`the app started successfully at the portno ${port} `);
})