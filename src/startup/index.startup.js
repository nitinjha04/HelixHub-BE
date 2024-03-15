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

  console.log("-----------");

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Handle chat events, etc.
    socket.on("send_msg", (msg) => {
      console.log("Message:", msg);
      io.emit("receive_msg", msg); // Broadcast the message to all connected clients
    });

    // Handle disconnect event
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  //Starting Server
  httpServer.listen(PORT || 53321, () => {
    console.log("🚀 Server is Running on PORT =>", PORT || 53321);
  });
};
