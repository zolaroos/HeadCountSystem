const express = require('express');
const app = express();
const port = process.env.PORT || 3334; 

app.get('/get-token', (req, res) => {
  try {
    const token = generateToken();
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

function generateToken() {
  const token = Math.floor(Math.random() * 100) + 1;
  return token;
}

app.listen(port, () => {
  console.log(`HeadCount service is running on port ${port}`);
});
