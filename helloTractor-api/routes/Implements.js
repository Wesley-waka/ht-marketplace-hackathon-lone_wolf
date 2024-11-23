import Implements from '../models/Implements.js';
import express from "express";
import { S3Client } from "@aws-sdk/client-s3";
import multer from 'multer';
import multerS3 from 'multer-s3';
import { config } from 'dotenv';

config();

// Configure AWS SDK v3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

const implementsRouter = express.Router();

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



implementsRouter.post('/implements', async (req, res) => {
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
    const images = req.files.map(file => file.path);

    const imageUrl = req.file.location;

    const Implements = new Implements({
      model,
      year,
      images: imageUrl,
      dealer: dealerId,
    });

    await Implements.save();
    res.status(201).json(Implements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

implementsRouter.get('/implements/:id', async (req, res) => {
  try {
    const Implements = await Implements.findById(req.params.id).populate('dealer');
    if (!Implements) {
      return res.status(404).json({ error: 'Implements not found' });
    }
    res.json(Implements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default implementsRouter;