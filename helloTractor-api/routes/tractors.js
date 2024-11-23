import express from "express";
import Tractor from '../models/Tractor.js';
import multer from 'multer';
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from 'multer-s3';
import { config } from 'dotenv';
// Configure AWS SDK
// config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });
config();


// const s3 = new S3();
const tractorRouter = express.Router();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

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

tractorRouter.post('/tractors', async (req, res) => {

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

    const { model, year, dealerId } = req.body;

    const imageUrl = req.file.location;// S3 URL

    const tractor = new Tractor({
      model,
      year,
      images: imageUrl,
      dealer: dealerId,
    });

    await tractor.save();
    res.status(201).json(tractor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

tractorRouter.get('/tractors/:id', async (req, res) => {
  try {
    const tractor = await Tractor.findById(req.params.id).populate('dealer');

    if (!tractor) {
      return res.status(404).json({ error: 'Tractor not found' });
    }

    const allTractors = await Tractor.find();
    const totalPrices = allTractors.reduce((sum, t) => sum + t.price, 0);
    const priceRatio = (tractor.price / totalPrices) * 100;

    res.json({ ...tractor.toObject(), priceRatio });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default tractorRouter;