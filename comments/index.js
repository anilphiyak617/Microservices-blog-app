const express= require('express')
const {randomBytes} =require('crypto')

const app= express();
app.use(express.json());

const commentsByPostId ={};

app.post('posts/:id/comments',(req,res)=>{

    const postId=req.params.id;
    express.send(commentsByPostId[req.params.id] || [] )

});


app.post('posts/:id/comments',(req,res)=>{
    const commentId= randomBytes(6).toString('hex');
    const {content} =req.body;

    const postId=req.params.id;

    const comments = commentsByPostId[postId] || [];
   
    // ! redundant copy of the comment 
    comments.push({id: commentId, content});

    commentsByPostId[postId] = comments;

    res.status(201).send(comments);
});

