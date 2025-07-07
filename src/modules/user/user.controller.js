import User from '../../../databases/models/user.model.js';
import jwt from 'jsonwebtoken';
import { generateBarberToken } from '../../middlewares/barberToken.js';
import dotenv from 'dotenv';

dotenv.config();

const signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    const barberToken = generateBarberToken();

    res.status(201).json({
      message: 'User created successfully',
      token,
      barberToken,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const signIn = async (req, res) => {
  const { password } = req.body;
  const user = req.user;

  try {
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    const barberToken = generateBarberToken();

    res.status(200).json({
      message: 'Sign in successful',
      token,
      barberToken,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export { signUp, signIn };