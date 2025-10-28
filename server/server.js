import express from 'express';
import "dotenv/config";
import cors from 'cors';
import http from 'http';
import {connectDB} from "./lib/db.js"

// express app
const app = express();
const server = http.createServer(app)

// middleware
app.use(express.json({limit: '4mb'}));
app.use(cors())

app.use("/api/status", (req,res) => {
    res.json({status: "Server is running"})
});

//mongodb
await connectDB()

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

