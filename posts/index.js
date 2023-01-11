const express = require('express');
const cors= require('cors');
const {randomBytes} = require('crypto');
const { default: axios } = require('axios');

const app=express();
app.use(express.json());

// cors middleware 
app.use(cors());
const posts={};

app.get('',(req,res)=>{
    
    console.log("/home route is called");
    res.json("dsfdsf");
})

app.get('/posts',(req,res)=>{
    res.send(posts);
});

app.post('/posts',async (req,res)=>{

    const id = randomBytes(5).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id,title
    }
    try{

        await axios.post(`http://localhost:4005/events`,{
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


app.listen(4000,()=>{
    console.log("listening on 4000");
})