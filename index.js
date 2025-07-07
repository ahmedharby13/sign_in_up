import express from 'express';
import connectDB from './databases/dbConnection.js';
import userRoutes from './src/modules/user/user.routes.js';
import notesRoutes from './src/modules/notes/notes.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/notes', notesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});