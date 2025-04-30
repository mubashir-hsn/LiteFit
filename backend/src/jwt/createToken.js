import jwt from 'jsonwebtoken';
import User from '../users/models/user.model.js';

const generateToken = async (userId, res) => {
  const JWT_SECRET_KEY = process.env.JWT_SECRETKEY;

  try {
    // Sign the JWT token
    const token = jwt.sign({ userId }, JWT_SECRET_KEY, {
      expiresIn: '1d',  // Token expiration time
    });

    // Set the token as a cookie
    res.cookie('jwt', token, {
      httpOnly: true,      // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production (HTTPS)
      sameSite: 'strict',  // Ensures the cookie is only sent for same-site requests
    });
 
    await User.findByIdAndUpdate(userId , {token});
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default generateToken;
