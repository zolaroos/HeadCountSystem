const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3333;

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, crypto.randomBytes(16).toString('hex') + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

let uploadedImages = [];

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const processImages = async () => {
  try {
    const imageFiles = fs.readdirSync('uploads');

    for (const fileName of imageFiles) {
      const filePath = path.join('uploads', fileName);
      const currentImageBuffer = fs.readFileSync(filePath);
      const currentImageHash = crypto.createHash('md5').update(currentImageBuffer).digest('hex');

      if (!uploadedImages.some((img) => img.hash === currentImageHash)) {
        const imageUrl = `/uploads/${fileName}`;

        const headCountServiceURL = 'http://localhost:3334';
        const tokenResponse = await fetch(`${headCountServiceURL}/get-token`);
        const { token } = await tokenResponse.json();

        const uploadedImage = {
          url: imageUrl,
          token,
          hash: currentImageHash,
        };
        uploadedImages.push(uploadedImage);
      }
    }
  } catch (error) {
    console.error('Error processing images:', error);
  }
};

app.post('/upload', async (req, res) => {
  processImages();
  res.status(200).json({ message: 'Processing complete' });
});

app.get('/display', (req, res) => {
  res.json(uploadedImages);
});

const checkForNewImages = () => {
  setInterval(processImages, 30000); 
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  checkForNewImages();
});
