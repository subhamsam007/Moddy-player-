const express = require('express');
const multer = require('multer');
const { uploadFile } = require('../service/storage.service');           
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/songs', upload.single('songFile'), async (req, res) => {
    const fileData =await uploadFile(req.file); 
    console.log(fileData);
  // Logic to add a new song
  res.send('Add a new song');
  console.log(req.file);
  res.status(201).json({ message: 'Song uploaded successfully', fileData });
});




module.exports = router;
