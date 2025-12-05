import express from 'express';
import "dotenv/config";
import cors from 'cors';
import http from 'http';
import {connectDB} from "./lib/db.js"
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import {Server} from "socket.io" 
import { Socket } from 'dgram';

// express app
const app = express();
const server = http.createServer(app)

//initialize socket.io server
export const io = new Server( server, {
    cors: {origin: "*"}
})

//store online users
export const userSocketMap = {};

// Socket.io controller handler
io.on("connection", (socket)=> {
    const userId = socket.handshake.query.userId;
    console.log();
    console.log("User connected", userId);

    if(userId) userSocketMap[userId] = socket.id;

    //emit on;ine users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", ()=>{
        console.log("user disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

// middleware
app.use(express.json({limit: '4mb'}));
app.use(cors())


//routes
app.use("/api/status", (req,res) => {
    res.json({status: "Server is running"})
});

app.use("/api/auth", userRouter)
app.use("/api/messages", messageRouter)

//mongodb
await connectDB()

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

