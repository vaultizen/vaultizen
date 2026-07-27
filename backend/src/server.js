import express from 'express';
import cors from 'cors';
import { PORT } from './config/index.js';
import assetTokenRoutes from './routes/assetToken.js';
import assetRoutes from './routes/asset.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/asset-token', assetTokenRoutes);
app.use('/asset', assetRoutes);

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});