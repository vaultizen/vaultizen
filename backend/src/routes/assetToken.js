import express from 'express';
import { generateAssetToken } from '../controllers/assetTokenController.js';

const router = express.Router();
router.get('/:sku', generateAssetToken);

export default router;