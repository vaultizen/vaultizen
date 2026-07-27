import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const ASSET_TOKEN_SECRET = process.env.ASSET_TOKEN_SECRET || 'your-secret-key';
export const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';