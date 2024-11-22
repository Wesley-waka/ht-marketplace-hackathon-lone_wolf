const router = express.Router();
import Implements from '../models/Implements';
const upload = multer({ storage });

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


router.post('/implements', upload.array('images', 5), async (req, res) => {
  try {
    const { model, year, dealerId } = req.body;
    const images = req.files.map(file => file.path);

    const Implements = new Implements({
      model,
      year,
      images,
      dealer: dealerId,
    });

    await Implements.save();
    res.status(201).json(Implements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/implements/:id', async (req, res) => {
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

export default router;