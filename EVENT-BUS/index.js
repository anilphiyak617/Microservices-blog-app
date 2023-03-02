const express=require('express');
const axios=require('axios');
const cors=require('cors');

const PORT=4005;

const app=express();
app.use(cors());
app.use(express.json());


app.get('/events',(req,res)=>{
    res.send("Event Bus");
});

// Receiving and event Emmition by event bus
app.post('/events',(req,res)=>{
    const event=req.body;
    console.log("Event Received: ",event);
    
    // request to post service
    try{

        axios.post('http://localhost:4000/events',event);
    }
    catch(e){
        console.log(e,"error in post service")
    }

    //request to comment service
    try{

        axios.post('http://localhost:4001/events',event);
    }
    catch(e){
        console.log(e,"error in comment service")
    }
    
    //request to query service
    try {
        
        axios.post('http://localhost:4002/events',event);
    }
    catch(e){
        console.log(e,"error in query service")
    }

    //request to moderation service
    try {
        
        axios.post('http://localhost:4004/events',event);
    }
    catch(e){
        console.log(e,"error in moderation service")
    }
    
    
    res.send({status:'OK'});
});


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
}) 