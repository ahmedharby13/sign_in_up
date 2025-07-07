import express from 'express';
import { createNote, getAllNotes } from './notes.controller.js';
import verifyToken from '../../middlewares/verifyToken.js';
import { barberToken } from '../../middlewares/barberToken.js';

const router = express.Router();

router.post('/', verifyToken, barberToken, createNote);
router.get('/', verifyToken, barberToken, getAllNotes);

export default router;