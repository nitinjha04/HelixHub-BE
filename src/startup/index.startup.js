const { PORT } = process.env;
const http = require("http");
const { Server } = require("socket.io");

module.exports = async (app) => {
  await require("./db.startup")(app); // initiate db connection
  require("./routes.startup")(app); // initiate routes
  require("./error.startup")(app); // initiate error handlers

  // socket io

  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.receiver);


      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-receive", {
          sender: data.sender,
          message: { text: data.message },
        });
      }
    });
  });

  //Starting Server
  httpServer.listen(PORT || 53321, () => {
    console.log("🚀 Server is Running on PORT =>", PORT || 53321);
  });
};
