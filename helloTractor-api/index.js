import express, { json, static as serveStatic } from 'express';
import pkg from 'body-parser';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'; // Import the cors package
import authRouter from './routes/auth.js';
import reviewRouter from './routes/review.routes.js';
import messageRouter from './routes/message.js';
import tractorRouter from './routes/tractors.js';
import implementsRouter from './routes/implements.js';
import childDealerRouter from './routes/childDealer.js';
import DealerRouter from './routes/dealer.js';
import cookieParser from 'cookie-parser';

config();


const app = express();
const { json: _json } = pkg;
const { initialize, session: passportSession } = passport;

// Configure CORS to allow all origins
app.use(cors({
  origin: '*', // Allows all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));



app.use(cookieParser());


app.use(_json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

connect(process.env.MONGO_URI);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(json());
app.use('/uploads', serveStatic(path.join(__dirname, 'uploads')));
app.use('/api/tractor', tractorRouter);
app.use('/api/implement', implementsRouter);
app.use("/api/review", reviewRouter);
app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);
app.use('/api/child-dealer', childDealerRouter);
app.use('/api/dealer', DealerRouter);

app.get('/api', (req, res) => {
  res.send('Hello Tractor API is running....');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});