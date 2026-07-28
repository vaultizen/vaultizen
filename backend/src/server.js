import express from 'express';
import cors from 'cors';
import { PORT } from './config/index.js';
import assetTokenRoutes from './routes/assetToken.js';
import assetRoutes from './routes/asset.js';

const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== Health & Root Endpoints =====
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Vaultizen Backend is running',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// ===== API Routes =====
app.use('/asset-token', assetTokenRoutes);
app.use('/asset', assetRoutes);

// ===== 404 Handler =====
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ===== Global Error Handler =====
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// ===== Start Server =====
const server = app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// ===== Graceful Shutdown =====
const shutdown = () => {
  console.log('🛑 Shutting down gracefully...');
  server.close(() => {
    console.log('👋 Server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// ===== Unhandled Promise Rejections =====
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Optionally exit or log – we'll just log and keep running.
});

export default app; // optional for testing