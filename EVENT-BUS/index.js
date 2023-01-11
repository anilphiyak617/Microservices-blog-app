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

// Event Emmition to event bus
app.post('/events',(req,res)=>{
    const event=req.body;
    
    // request to post service
    axios.post('http://localhost:4000/events',event);
    // request to comment service
    axios.post('http://localhost:4001/events',event);
    // request to query service
    
    axios.post('http://localhost:4002/events',event);
    
    res.send({status:'OK'});
});


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
}) 