const colors = require("colors");
const path = require("path");
const http = require("http");
const jwt = require("jsonwebtoken");
const express = require("express");
const socketio = require("socket.io");
const { notFound, errorHandler } = require("./middleware/error");
const connectDB = require("./db");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const ioCookieParser = require("socket.io-cookie-parser");
const logger = require("morgan");

const { addUser, removeUser, getUser } = require('./utils/users');
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const contestRouter = require("./routes/contest");
const conversationRouter = require("./routes/conversation");
const messageRouter = require("./routes/message");
const awsRouter = require("./routes/aws")
const notificationRouter = require("./routes/notification")

const { json, urlencoded } = express;

connectDB();
const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
  },
});


io.use(ioCookieParser());
io.use(function(socket, next){
  let token = socket.request.cookies['token'];
  if (token){
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = decoded;
      next();
    } catch (err) {
      return next(new Error("Authentication Error"))
    }
  }
  else{
    return next(new Error("Authentication Error"))
  }
}).on("connection", (socket, next) => {
  console.log('New user connected');
  io.emit("Welocme", "Hello to the socket server")
  
  socket.on("addUser", (userId) =>{
    const users = addUser(userId, socket.id);
    io.emit("getUsers", users);
  })


  socket.on("sendMessage", ({receiverId, ...rest})=>{
    const activeUser = getUser(receiverId);
    if (activeUser) {
      io.to(activeUser.socketId).emit('getMessage', {...rest});
    }
  })
  
  socket.on('disconnect', () => {
    console.log('User has disconnected');
    const users = removeUser(socket.id);
    io.emit("getUsers", users);
  })
});

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/contest", contestRouter);
app.use("/chat", conversationRouter);
app.use("/chat/message", messageRouter);
app.use("/aws",awsRouter);
app.use("/notification", notificationRouter)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname), "client", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = { app, server };
