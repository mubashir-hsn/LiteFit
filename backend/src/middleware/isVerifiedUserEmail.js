import User from '../users/models/user.model.js'

export const isVerifiedUser = async (req, res, next) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(403).send({ message: "Email not existed" });
      }
      if (!user.isVerified) {
        return res.status(403).send({ message: "Your email is not verified. Please verify your email first." });
      }
      next(); // Proceed if the user is verified
    } catch (error) {
      console.error("Error in email verification middleware:", error);
      res.status(500).send({ message: "An error occurred. Please try again later." });
    }
  };
  