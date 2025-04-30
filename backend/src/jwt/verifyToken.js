import User from "../users/models/user.model.js";
import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
    try {
        // Get the token from the cookies
        const token = req.cookies.jwt;

        // If no token is provided, deny access
        if (!token) {
            return res.status(401).send({ message: 'No token, authorization denied.' });
        }

        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

        // If the token is invalid or doesn't contain userId, return an error
        if (!decoded || !decoded.userId) {
            return res.status(401).send({ message: 'Invalid token.' });
        }

        // Find the user by decoded userId from the token, exclude the password field
        const user = await User.findById(decoded.userId).select('-password');

        // If the user is not found, return a 404 error
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        // Attach the user object to the request for further use in other routes
        req.user = user;
        req.role = user.role;
        // Move to the next middleware or route handler
        next();
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error in verifyToken middleware:", error);
        
        // Handle invalid token error specifically
        if (error.name === 'sendWebTokenError') {
            return res.status(401).send({ message: 'Invalid token.' });
        }

        // Return a generic internal server error for any other issue
        return res.status(500).send({ error: 'Internal server error.' });
    }
};

export default verifyToken;
