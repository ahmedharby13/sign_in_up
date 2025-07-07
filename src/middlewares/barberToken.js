import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const generateBarberToken = () => {
  return crypto.randomBytes(16).toString('hex'); // توكن عشوائي 32 حرف
};

const barberToken = (req, res, next) => {
  const barberToken = req.header('X-Barber-Token');

  if (!barberToken) {
    return res.status(403).json({ message: 'Barber token required' });
  }

  // هنا ممكن تضيف منطق للتحقق من التوكن لو عايز تخليه ديناميكي أكتر
  // لكن دلوقتي هنفترض إنه مجرد توكن بسيط للتجربة
  if (barberToken !== process.env.BARBER_TOKEN) {
    return res.status(403).json({ message: 'Invalid Barber token' });
  }

  next();
};

export { generateBarberToken, barberToken };