const express= require('express')
const cors = require('cors')

const app=express();
app.use(express.json())
app.use(cors())

// Temporary data 
const posts={};

app.get('/posts',(req,res)=>{
    res.send(posts);
});


// receives the event from event bus
app.post('/events',(req,res)=>{

    const {type,data}=req.body;

    if(type=='PostCreated'){
        console.log(posts);
        const {id,title}=data;
        posts[id]={id,title,comments:[]};
    }
    if(type==='CommentCreated'){
        const {id,postId,content,status}=data;
        const post=posts[postId];
        post.comments?.push({id,content,status});
    }

    if(type==='CommentUpdated'){
        const {id,postId,content,status}=data;
        const post=posts[postId];
        const comment=post.comments?.find(comment=>comment.id===id);
        comment.status=status;
        comment.content=content;
    }
    console.log("Event Received: ",type);
    // response status for sucessfull creation of resource
    res.status(201).send(posts); 
})


app.listen(4002,()=>{  
    console.log("listening on 4002");
});