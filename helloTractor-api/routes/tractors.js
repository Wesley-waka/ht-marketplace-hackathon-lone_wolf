import Tractor from '../models/Tractor';
import { config, S3 } from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

// Configure AWS SDK
config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new S3();
const router = express.Router();

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

router.post('/tractors', upload.array('images', 5), async (req, res) => {
  try {
    const { model, year, dealerId } = req.body;
    const images = req.files.map(file => file.location); // S3 URL

    const tractor = new Tractor({
      model,
      year,
      images,
      dealer: dealerId,
    });

    await tractor.save();
    res.status(201).json(tractor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/tractors/:id', async (req, res) => {
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

export default router;