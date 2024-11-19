const express = require("express");
const connectDB = require("./database/connection");
const cors = require("cors");
// users with privelege create slots for
const http = require("http");
const { Server } = require("socket.io");

// configuration
require("dotenv").config(); // to get data from .env file for seccurity
const PORT = process.env.PORT;

// Routes
const AuthRoutes = require("./routes/AuthRoutes");
const medCenterRoutes = require("./routes/MedicalCenter");
const usersRoutes = require("./routes/UserRoutes");
const searchRoutes = require("./routes/SearchFilterRoute");

const app = express();
app.use(cors());
// DB connection
connectDB(process.env.mongo_URL);
app.use(express.json());
app.use("/auth", AuthRoutes);
// app.use("/appointments", appointmentRoutes);
app.use("/users", usersRoutes);
app.use("/medCenter", medCenterRoutes);
app.use("/", searchRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
    // console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    // console.log("User Disconnected", socket.id);
  });
});
server.listen(PORT, () => {
  console.log("Server started");
});
