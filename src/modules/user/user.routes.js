import express from 'express';
import { signUp, signIn } from './user.controller.js';
import checkEmail from '../../middlewares/checkEmail.js';

const router = express.Router();

router.post('/signup', checkEmail, signUp);
router.post('/signin', checkEmail, signIn);

export default router;