const express = require('express');
const multer = require('multer');
const { uploadFile, getFile } = require('../services/s3Service');

const upload = multer();
const router = express.Router();

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a file
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: The file was successfully uploaded
 *       500:
 *         description: Some server error
 */
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const result = await uploadFile(req.file);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /download/{fileName}:
 *   get:
 *     summary: Download a file
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: fileName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the file to download
 *     responses:
 *       200:
 *         description: The file was successfully downloaded
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: The file was not found
 *       500:
 *         description: Some server error
 */
router.get('/download/:fileName', async (req, res) => {
  const { fileName } = req.params;
  try {
    const fileStream = await getFile(fileName);
    fileStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
