import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import { connectDb } from './DB/connection.js';
import { router } from './Routes/router.js';

config();
const app = express()
app.use(express.json())
// app.use(cors())
app.use(cors({
    origin: 'https://mern-blog-app-1-frontend.onrender.com', // Exact frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
connectDb()
app.use('/api',router)


const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is ruuning in port, ${PORT}`)
})

app.get('/',(req, res)=>{
    res.send("Server is running")
})
