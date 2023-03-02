const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 4001;
// {id:string,postId:string, content:string }
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  // console.log("get comments called");
  const postId = req.params.id;
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(6).toString("hex");
  const { content } = req.body;

  const postId = req.params.id;
  console.log(req.params);

  const comments = commentsByPostId[postId] || [];

  // ! redundant copy of the comment
  comments.push({ id: commentId, content});

  commentsByPostId[postId] = comments;

  try {
    //  emmiting the event to the event bus
    await axios.post(`http://localhost:4005/events`, {
      type: "CommentCreated",
      data: { id: commentId, postId, content ,status:'pending'},
    });
  } catch (err) {
    console.log(err);
  }

  res.status(201).send(commentsByPostId);
});

// receives the event from the event bus
app.post("/events", async (req, res) => {
  const { type } = req.body;
  console.log("Event Received: ", type);

    if(type==='CommentModerated'){
        
        const {postId,id,status,content}=req.body.data;
        const comments=commentsByPostId[postId];
        const comment=comments.find(comment=>comment.id===id);
        comment.status=status;

        try{
            // emmiting the event to the event bus
            await axios.post(`http://localhost:4005/events`, {
                type: "CommentUpdated",
                data: { id, postId, content ,status},
            });   
        }
    catch {
        console.log("error in the event bus");
    }
    
}

  res.send({});
});

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
