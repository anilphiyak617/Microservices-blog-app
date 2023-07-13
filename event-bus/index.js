const express=require('express');
const axios=require('axios');
const cors=require('cors');

const PORT=4005;

const app=express();
app.use(cors());
app.use(express.json());

// creating a data-bust-event-store
const event_data_bus=[]

app.get('/events',(req,res)=>{
    // res.send("This is the Event Bus");
    res.status(200).send(event_data_bus)
});

// Receiving and event Emmition by event bus
app.post('/events',async (req,res)=>{
    const event=req.body;
    // console.log("Event Received: ",event);

    // console.log("EVENT", event_data_bus);

    // updating the event into the event data bus
    event_data_bus.push(event)
    // request to post service    <App />
    const services = [
        { url: 'http://localhost:4002/events', name: 'query service' },
        { url: 'http://localhost:4000/events', name: 'post service' },
        { url: 'http://localhost:4001/events', name: 'comment service' },
        { url: 'http://localhost:4004/events', name: 'moderation service' },
    ];

    // array of Promises representing requesting of the service
    const serviceRequests = services.map(async (service) => {
        try {
          await axios.post(service.url, event);
          console.log(`Event sent to ${service.name}`);
        } catch (error) {
          console.error(`Error in ${service.name}:`, error.message);
        }
      });
    
      try {
        // resolving all requests in parallel
        await Promise.all(serviceRequests);
      } catch (error) {
        console.error('Error:', error.message);
      }
    
    res.send({status:'OK'});
});


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
}) 