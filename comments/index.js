const express= require('express')
const cors = require('cors')    
const {randomBytes} =require('crypto')

const app= express();
app.use(express.json());
app.use(cors());
const PORT=4001;
const commentsByPostId ={};

app.get('/posts/:id/comments',(req,res)=>{

    // console.log("get comments called");
    const postId=req.params.id;
    res.send(commentsByPostId[req.params.id] || [] )

});


app.post('/posts/:id/comments',(req,res)=>{
   

    const commentId= randomBytes(6).toString('hex');
    const {content} =req.body;

    const postId=req.params.id;

    const comments = commentsByPostId[postId] || [];
   
    // ! redundant copy of the comment 
    comments.push({id: commentId, content});

    commentsByPostId[postId] = comments;

    res.status(201).send(comments);
});


app.listen(PORT,()=>{
    console.log(`listening at port ${PORT}`);
})
