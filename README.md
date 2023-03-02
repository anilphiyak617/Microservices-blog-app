Welcome to my microservices-based blog app! This app is built using Node.js and Express. It allows users to create, read, update, and delete blog posts, as well as view other users' comments and moderator's actions.

To get started, clone the repository and run npm install to install the necessary dependencies. Then, run npm start to start the development server.

The app is split into multiple services:

The frontend service handles displaying the blog posts and comments to the user.
The posts service handles the API calls related to creating, reading, updating and deleting blog posts.
The comments service handles the API calls related to creating, reading, updating and deleting comments on blog posts.
The query service handles the search queries on blog posts.
The moderator service handles moderating comments and posts.
This app uses an event-bus architecture to communicate between different services. This allows for decoupled and maintainable services.

The app also includes user authentication and authorization feature which is implemented using JWT.

The app is designed to be easily scalable and maintainable, making it a great starting point for any large-scale blog app.

Thank you for checking out my app. I hope you find it useful!
