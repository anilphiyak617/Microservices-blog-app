const express=require('express')
const axios=require('axios')

const PORT=4004
const PORT_EVENT_BUS=4005
const  app= express();

app.use(express.json());

// receives the event from event bus
app.post('/events',async (req,res)=>{

    const {type,data}=req.body;
    if(type=='CommentCreated'){
        const status= data.content.includes('orange')?'rejected':'approved';
        console.log("comment created event recieved")

            // emmiting the event to the event bus
        try {
            await setTimeout(async ()=>{
                
                await axios.post(`http://localhost:${PORT_EVENT_BUS}/events`,{
                    type:'CommentModerated',
                    data:{
                        ...data,
                        status:status
                    }
            }
                );
                
                console.log("moderation-completed")},10000)
        }
        catch{
            console.log("error in event bus");
        }
    }

    res.status(201).send({});
});







app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})