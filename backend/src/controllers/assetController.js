import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { ASSET_TOKEN_SECRET } from '../config/index.js';

const fileMap = {
  image: 'saved.png',
  video: 'video.mp4',
  image1: 'preview1.png',
  image2: 'preview2.png',
  image3: 'preview3.png',
  image4: 'preview4.png',
  image5: 'preview5.png',
  image6: 'preview6.png',
};

const mimeMap = {
  png: 'image/png',
  mp4: 'video/mp4',
};

export function serveAsset(req, res) {
  const { sku, type } = req.params;
  const token = req.query.token;

  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, ASSET_TOKEN_SECRET);
    if (decoded.sku !== sku) {
      return res.status(403).json({ error: 'Invalid token' });
    }
  } catch {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }

  const fileName = fileMap[type];
  if (!fileName) {
    return res.status(400).json({ error: 'Invalid type' });
  }

  // Build path to private folder
  const filePath = path.join(process.cwd(), 'private', 'products', sku, fileName);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  const ext = path.extname(fileName).slice(1);
  const mimeType = mimeMap[ext] || 'application/octet-stream';

  res.setHeader('Content-Type', mimeType);
  res.setHeader('Cache-Control', 'no-store, must-revalidate');
  fs.createReadStream(filePath).pipe(res);
}