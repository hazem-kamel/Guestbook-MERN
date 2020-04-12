const express = require("express");
const http = require("http");
const session = require("express-session");
const connectStore = require("connect-mongo");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const Room = require("./API/Config/Chats");
const connectDB = require("./MongoDB/Mongo");
const User = require("./API/Config/Register");
const app = express();

//Passport config
require("./API/Config/Passport")(passport);

connectDB();

const server = http.createServer(app);

//cors
const options = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Authorization",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: true,
};
app.use(cors(options));

//This makes it more difficult for users to see that we are using Express for security
app.disable("x-powered-by");

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Express session
const MongoStore = connectStore(session);
const SESS_NAME = "sid";
app.use(
  session({
    name: SESS_NAME,
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    maxAge: 1000 * 60 * 60 * 3, // 3 days
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: "session",
      ttl: parseInt(1000 * 60 * 60 * 3) / 1000,
    }),
    cookie: {
      sameSite: true,
      secure: "development" === "production",
      maxAge: parseInt(1000 * 60 * 60 * 3),
    },
  })
);

//import Routes
const register = require("./API/Routes/User");
const userLogin = require("./API/Routes/login");
const checkUser = require("./API/Routes/checkUser");

//To extract json data from Client(post) requests and urlencoded with bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//Make server use the routes
app.use("/api", register);
app.use("/api", userLogin);
app.use("/api", checkUser);

//Get All Friends
app.get("/friends", (req, res) => {
  if (req.session.user) {
    Room.find({ participants: { $all: [req.session.user.username] } })
      .then((room) => {
        let friends = [];
        for (i in room) {
          for (x in room[i].participants) {
            if (!(room[i].participants[x] === req.session.user.username)) {
              friends.push(room[i].participants[x]);
            }
          }
        }
        if (friends.length > 0) {
          res.send(friends);
        } else {
          res.send("No Friends");
        }
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    res.send("You are not authorised please login");
  }
});

//Get Messages for a specific conversation
app.post("/chat", (req, res) => {
  convID = (req.body.username.toUpperCase() + req.body.friend.toUpperCase())
    .split("")
    .sort()
    .join("");

  Room.findOne({ name: convID })
    .then((room) => {
      res.send(room.messages);
    })
    .catch((err) => {
      console.log(err);
    });
});
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
//Post Message in a specific Conversation
app.post("/messages", (req, res) => {
  convID = (req.body.username.toUpperCase() + req.body.friend.toUpperCase())
    .split("")
    .sort()
    .join("");

  let newDate = new Date(Date.now()).toLocaleString("en-GB");

  let messageData = {
    sender: req.body.username.toUpperCase(),
    message: req.body.message,
    dateCreated: newDate,
  };

  let newMessageData = {
    name: convID,
    participants: [
      req.body.username.toUpperCase(),
      req.body.friend.toUpperCase(),
    ],
    messages: messageData,
  };
  Room.findOne({ name: convID }).then((room) => {
    if (room) {
      room.messages.push(messageData);
      room.save();
      io.emit("newmessage", { message: messageData });
    } else {
      Room.create(newMessageData)
        .then((room) => {
          res.send("Added");
        })
        .catch((err) => {
          res.send("error" + err);
        });
    }
  });
});

const PORT = process.env.PORT || 6000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
