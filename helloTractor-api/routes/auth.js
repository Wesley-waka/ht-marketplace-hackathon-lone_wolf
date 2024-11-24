import express from "express";
import User from '../models/user.js';
import passport from 'passport';
import { createTransport } from 'nodemailer';
import { randomBytes } from 'crypto';
import sign from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';
import cookieParser from 'cookie-parser';
import { S3Client } from "@aws-sdk/client-s3";
import multer from 'multer';
import multerS3 from 'multer-s3';
import { config } from 'dotenv';
import configurePassport from "../config/passport.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

config();



const authRouter = express.Router();

// Configure AWS SDK v3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

configurePassport();

// Updated multer configuration for S3 v3
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({
  fileFilter: fileFilter,
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB file size limit
  }
});

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware to parse cookies
authRouter.use(cookieParser());

// Google authentication routes
// authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
//   res.redirect('/verify-2fa');
// });

authRouter.get('/google',
  (req, res, next) => {
    const { userType } = req.query;
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account',
      state: JSON.stringify(userType),
    })(req, res, next);
  }
);

authRouter.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to the desired page
    res.redirect('/verify-2fa?email=' + req.user.email);
    // res.redirect(`https://wes.com/verify-2fa?email=${req.user.email}`);
    // res.redirect(`https://wes.com/verify-2fa?email=${req.user.email}`);
  }
);

// Facebook authentication routes
authRouter.get('/facebook', (req, res, next) => {
  const { userType } = req.query;

  passport.authenticate('facebook', {
    scope: ['email'],
    state: JSON.stringify(userType)
  })(req, res, next);
});

authRouter.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/verify-2fa?email=' + req.user.email);
});

authRouter.post('/verify-2fa', async (req, res) => {
  const { email } = req.query;
  const { twoFactorCode } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send('User not found.');
    }

    if (user.twoFactorCode === twoFactorCode) {
      user.isVerified = true;
      await user.save();

      const token = sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true });
      res.status(200).send('2FA verification successful.');
    } else {
      res.status(400).send('Invalid 2FA code.');
    }
  } catch (error) {
    res.status(500).send('Error verifying 2FA code. Please try again.');
  }
});



// Configure Nodemailer
const transporter = createTransport({
  service: 'Gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Updated sign-up route with error handling
authRouter.post('/signup', async (req, res) => {
  // Wrap the multer upload in a promise to handle errors better
  const uploadMiddleware = upload.single('image');

  try {
    await new Promise((resolve, reject) => {
      uploadMiddleware(req, res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    if (!req.file) {
      return res.status(400).send('Please upload an image file.');
    }

    const { name, email, password, location, phoneNumber, user } = req.body;

    // Generate a 2FA code
    const twoFactorCode = randomBytes(3).toString('hex');

    // Hash the password
    const hashedPassword = await hash(password, 10);

    const imageUrl = req.file.location; // S3 URL

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      twoFactorCode,
      images: imageUrl,
      location,
      phoneNumber,
      user,
      name,
      isApproved: user === 'buyer' ? true : false
    });

    await newUser.save();



    // Generate verification link
    const verificationLink = `${process.env.APP_URL}/verify-2FA?email=${email}`;

    // Send 2FA code via email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your 2FA Code',
      text: `Your 2FA code is: ${twoFactorCode}.Click the following link and enter the code to verify your email: ${verificationLink}`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send('Sign-up successful. Please check your email for the 2FA code.');
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).send(`Error signing up: ${error.message}`);
  }
});

// Sign-in route
authRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send('User not found.');
    }

    if (!user.isVerified) {
      return res.status(400).send('Email not verified.');
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password.');
    }

    generateTokenAndSetCookie(user._id, res);
    // const token = sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    // res.cookie('token', token, { httpOnly: true });
    res.status(200).send('Sign-in successful.');
  } catch (error) {
    res.status(500).send('Error signing in. Please try again.');
  }
});

authRouter.post('/users/:userId/favoriteProducts', async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.favoriteProducts.push(productId);
    await user.save();

    res.status(200).send('Product added to favorites');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get all favorite products
authRouter.get('/users/:userId/favoriteProducts', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate('favoriteProducts');
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user.favoriteProducts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Route to toggle isApproved field for a user
authRouter.patch('/users/:userId/toggleApproval', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.isApproved = !user.isApproved;
    await user.save();

    res.status(200).send(`User approval status changed to ${user.isApproved}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Update user details including images
authRouter.patch('/users/:userId', async (req, res) => {
  const uploadMiddleware = upload.single('image');

  try {
    await new Promise((resolve, reject) => {
      uploadMiddleware(req, res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    const { userId } = req.params;
    const { name, email, location, phoneNumber } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    if (req.file) {
      user.images = req.file.location; // Update image URL
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (location) user.location = location;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    await user.save();

    res.status(200).send('User updated successfully');
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).send(`Error updating user: ${error.message}`);
  }
});


authRouter.use(passport.initialize());
authRouter.use(passport.session());

export default authRouter;