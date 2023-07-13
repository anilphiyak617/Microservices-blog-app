const express = require('express');
const cors= require('cors');
const {randomBytes} = require('crypto');
const { default: axios } = require('axios');
require('dotenv').config({ path: '../.env' });


const app=express();
app.use(express.json());

// cors middleware 
app.use(cors());
const posts={};

const PORT = 4000;
const PORT_EVENT_BUS_SERVICE = 4005

app.get('',(req,res)=>{
    
    console.log("/home route is called");
    const responseData = {
        message: "This is the Home Route"
    };
    res.json(responseData);
})

app.get('/posts',(req,res)=>{
    res.send(posts);
});

// body
//{ title:string,content:string }
app.post('/posts',async (req,res)=>{

    const id = randomBytes(5).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id,title
    }
    try{

        await axios.post(`http://localhost:${PORT_EVENT_BUS_SERVICE}/events`,{
            type:'PostCreated',
            data:{  id,title }
        });
    }

    catch(err){
        console.log(err);
    }


    res.status(201).send(posts[id]);

});

// Event Bus receives the event
app.post('/events',(req,res)=>{
    const {type}=req.body;
    console.log("Event Received: ",type);
    res.send({type});
})


app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
})


