const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware to parse cookies
router.use(cookieParser());

// Google authentication routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/verify-2fa');
});

router.post('/verify-2fa', async (req, res) => {
  const { email, twoFactorCode } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send('User not found.');
    }

    if (user.twoFactorCode === twoFactorCode) {
      user.isVerified = true;
      await user.save();

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

      // Set token as a cookie
      res.cookie('token', token, { httpOnly: true });

      res.status(200).send('2FA verification successful.');
    } else {
      res.status(400).send('Invalid 2FA code.');
    }
  } catch (error) {
    res.status(500).send('Error verifying 2FA code. Please try again.');
  }
});

// Facebook authentication routes
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/verify-2fa');
});

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Sign-up route
router.post('/signup', upload.array('image', 1), async (req, res) => {
  const { email, password } = req.body;

  // Generate a 2FA code
  const twoFactorCode = crypto.randomBytes(3).toString('hex');

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const image = req.files[0].location; // S3 URL

  // Create a new user
  const newUser = new User({ email, password: hashedPassword, twoFactorCode, image });

  try {
    await newUser.save();

    // Send 2FA code via email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your 2FA Code',
      text: `Your 2FA code is: ${twoFactorCode}`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send('Sign-up successful. Please check your email for the 2FA code.');
  } catch (error) {
    res.status(500).send('Error signing up. Please try again.');
  }
});

// Sign-in route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send('User not found.');
    }

    if (!user.isVerified) {
      return res.status(400).send('Email not verified.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password.');
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Set token as a cookie
    res.cookie('token', token, { httpOnly: true });

    res.status(200).send('Sign-in successful.');
  } catch (error) {
    res.status(500).send('Error signing in. Please try again.');
  }
});

module.exports = router;