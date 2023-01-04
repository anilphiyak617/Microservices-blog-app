const express = require('express');
const {randomBytes} = require('crypto');

const app=express();
app.use(express.json());

const posts={ test:{name:"anil"}};

app.get('',(req,res)=>{
    
    console.log("/home route is called");
    res.json("dsfdsf");
})

app.get('/posts',(req,res)=>{
    res.send(posts);
});

app.post('/posts',(req,res)=>{

    console.log("body: ",req);
    const id = randomBytes(5).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id,title
    }

    res.status(201).send(posts[id]);

});

app.listen(4000,()=>{
    console.log("listening on 4000");
})