const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

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



passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      const twoFactorCode = crypto.randomBytes(3).toString('hex');
      user = new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        twoFactorCode
      });
      await user.save();

      // Send 2FA code via email
      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Your 2FA Code',
        text: `Your 2FA code is: ${twoFactorCode}`
      };

      await transporter.sendMail(mailOptions);
    }

    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'emails', 'name']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ facebookId: profile.id });

    if (!user) {
      const twoFactorCode = crypto.randomBytes(3).toString('hex');
      user = new User({
        facebookId: profile.id,
        email: profile.emails[0].value,
        twoFactorCode
      });
      await user.save();

      // Send 2FA code via email
      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Your 2FA Code',
        text: `Your 2FA code is: ${twoFactorCode}`
      };

      await transporter.sendMail(mailOptions);
    }

    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});