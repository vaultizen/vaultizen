import express from 'express';
import { serveAsset } from '../controllers/assetController.js';

const router = express.Router();
router.get('/:sku/:type', serveAsset);

export default router;