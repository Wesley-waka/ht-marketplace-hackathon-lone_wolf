import express, { json, static as serveStatic } from 'express';
import pkg from 'body-parser';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
// import authRouter from './routes/auth.js';
import reviewRouter from './routes/review.routes.js';

config();
const app = express();

const { json: _json } = pkg;
const { initialize: _initialize, session: _session } = passport;
// app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
// app.use(pkgPassport.initialize());
// app.use(pkgPassport.session());
app.use(_json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(json());
app.use('/uploads', serveStatic(path.join(__dirname, 'uploads')));

app.use("/api", reviewRouter);
// app.use('/auth', authRouter);

app.get('/', (req, res) => {
  console.log('Hello, world!');
  res.send('Hello, world!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});