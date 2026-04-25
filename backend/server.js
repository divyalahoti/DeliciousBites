import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoute.js'
import adminRouter from './routes/adminRoute.js'
import orderRouter from './routes/orderRoute.js'
import bookingRouter from './routes/bookingRoute.js'
import productRouter from './routes/productRoute.js'
import connectCloudinary from './config/cloudinary.js'
import dns from 'dns';
import cartRouter from './routes/cartRoute.js'
import expenseRouter from "./routes/expenseRoute.js";
import reportRouter from "./routes/reportRoute.js"
// change DNS

dns.setServers(["1.1.1.1", "8.8.8.8"]);


//App config 
const app = express()
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();


const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    "http://localhost:4000",

];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow non-browser tools like Postman
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error(' CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // if using cookies or Authorization headers
};

app.use(cors(corsOptions));


//middlewares
app.use(express.json())


//api endpoints
app.use('/api/user', userRouter);

app.use("/api/admin", adminRouter);

app.use('/api/orders', orderRouter);
app.use('/api/booking', bookingRouter);

app.use('/api/product', productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/report", reportRouter);

app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(port, () => console.log('Server Started on PORT : ' + port));
