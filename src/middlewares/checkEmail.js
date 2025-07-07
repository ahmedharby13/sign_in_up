import User from '../../databases/models/user.model.js';

const checkEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (req.path.includes('signup') && user) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    if (req.path.includes('signin') && !user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export default checkEmail;