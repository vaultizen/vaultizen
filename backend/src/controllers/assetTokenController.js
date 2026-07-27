import jwt from 'jsonwebtoken';
import { ASSET_TOKEN_SECRET } from '../config/index.js';

export function generateAssetToken(req, res) {
  const { sku } = req.params;
  // Token valid for 5 minutes
  const token = jwt.sign({ sku }, ASSET_TOKEN_SECRET, { expiresIn: '5m' });
  res.json({ token });
}