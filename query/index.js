const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const PORT_EVENT_BUS_SERVICE = 4005;
const PORT = 4002;
// Temporary data
const posts = {}; // { postId: {id,title,comments:[] }}

// Retrieve all posts binded with its comments
app.get("/posts", (req, res) => {
  res.send(posts);
});

// helper function to handle events 
const handleEvent = (type = 'unknown', data) => {
  if (type == "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, postId, content, status } = data;
    const post = posts[postId];
    post.comments?.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, postId, content, status } = data;
    const post = posts[postId];
    const comment = post.comments?.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
};

// receives the event from event bus
app.post("/events", (req, res) => {
  const { type:event_type, data } = req.body;

  console.log("Event Received: ", event_type);
  handleEvent(event_type, data);

  // response status for sucessfull creation of resource
  res.status(201).send(posts);
});

app.listen(PORT, async () => {
  console.log("listening on 4002");

  try {
    // fetching events log from the event-bus service
    const { data: event_data_bus } = await axios.get(
      `http://localhost:${PORT_EVENT_BUS_SERVICE}/events`
    );

    for (let event of event_data_bus) {

    if(event.type == undefined) console.log("EVENT,event");
      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
});
