import generateToken from '../../jwt/createToken.js';
import { sendVerificationCode } from '../../middleware/sendEmail.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

// Register User
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({ message: "All fields are required." });
  }

  try {
    // Check if the email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(401).send({ message: "Email already exists." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    // Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationCode
    });

    await newUser.save();
    await sendVerificationCode(newUser.email,verificationCode)
    if (newUser) {
        return res.status(201).send({ 
        message: "User registered. Please verify your email to complete registration.",
      });

    }
  } catch (error) {

    // Handle duplicate key error (in case there are other unique fields)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).send({ message: `${field} already exists.` });
    }

    console.error('User registration error:', error);
    res.status(500).send({ message: "An unexpected error occurred during registeration." });
  }
};

// verify new user email
export const verifyUserEmail = async(req,res)=>{
  try {

    const {code} = req.body
    const user = await User.findOne({
      verificationCode: code,
    })
    
    if (!user) {
       return res.status(400).send({message : "Invalid or Expired code."})
    }

    user.isVerified = true;
    user.verificationCode = undefined;

    await user.save();

    return res.status(200).send({
      message: "Email verified. You can now log in.",
      user:{
        userId: user._id
      },
    })
  } catch (error) {
    res.status(500).send({message : "Failed to verify email."})
    console.log("Error in verifying email: " , error)
  }
}

// verify existed user email or existed email...
export const verifyExistedUserEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ message: "Email is required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "Email does not exist." });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    user.verificationCode = verificationCode;
    await user.save();
    await sendVerificationCode(user.email, verificationCode);
    return res.status(200).send({
      message: "We have sent a verification code to your email. Please verify your email.",
    })
    

  } catch (error) {
    console.error("Error during email verification:", error);
    return res.status(500).send({ message: "Failed to send verification code. Please try again later." });
  }
};

// Login User
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password.' });
    }

    // Compare provided password with stored hash
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send({ message: 'Invalid email or password.' });
    }

    // Generate token on successful login
    const token = await generateToken(user._id, res);

    return res.status(200).send({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        profession: user.profession,
        bio: user.bio,
      },
      token:token
    });
  } catch (error) {
    console.error('User login error:', error);
    return res.status(500).send({ message: "Failed to user login." });
  }
};

// logout user
export const logout = async (req, res) => {
  try {
    // Clear the cookie containing the JWT token
    res.clearCookie('jwt');

    // Send success response
    res.status(200).send({ message: "User log out successfully" });
  } catch (error) {
    console.log("Error in logout: " + error.message);
    res.status(500).send({ message: "Failed to user logout" });
  }
};

// delete user
export const deleteUser = async (req,res)=>{
  try {
    const {id} = req.params
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      res.status(401).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted successfully" });

  } catch (error) {
    console.log("Error while delete user: " + error.message);
    res.status(500).send({ message: "Failed to deleting user" });
  }
}

// get all users
export const getAllUsers = async (req, res) => {
  try {
    
    const users = await User.find(
      { _id: { $ne: req.user.id } }, // Exclude the current user
      'id username email role profileImage' // Select specific fields
    ).sort({ createdAt: -1 });

    return res.status(200).send(users);
  } catch (error) {
    console.log("Error while fetching all users: " + error.message);
    res.status(500).send({ message: "Internal server error" });
  }
};



// Controller for changing the password
export const changePassword = async (req, res) => {
  try {
    
    const {userId,password } = req.body;

    // Validate the new password
    if (!password || password.length < 8) {
      return res.status(400).send({ message: "Password must be at least 8 characters long." });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).send({ message: "Password has been changed successfully." });
  } catch (error) {
    res.status(500).send({ message: "Failed to change password." });
    console.error("Error changing password:", error);
  }
};


export const updateUserRole = async (req, res) => {
  try {
    // Extract the user ID from the route parameters
    const { id } = req.params;

    // Extract the new role from the request body
    const { role } = req.body;

    // Find the user by ID and update the role, returning the updated user object
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });

    // If the user is not found, return a 401 error response
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    // Return success response with the updated user information
    res.status(200).send({ message: "User role updated successfully.", user });

  } catch (error) {
    // Log the error and send a 500 error response
    console.log("Error while updating userRole: " + error.message);
    res.status(500).send({ message: "Failed to updating userRole" });
  }
}


export const editUserProfile = async(req, res) => {
  try {
    // Destructure values from request body
    const { userId, username, profileImage, bio, profession } = req.body;

    // Check if userId is provided, return error if not
    if (!userId) {
      return res.status(400).send({ message: "userId is required." });
    }

    // Find user by ID
    const user = await User.findById(userId);

    // If user not found, return error
    if (!user) {
      return res.status(400).send({ message: "user not found." });
    }

    // Update user's information only if the corresponding field is provided
    if (username !== undefined) user.username = username;
    if (profileImage !== undefined) user.profileImage = profileImage;
    if (profession !== undefined) user.profession = profession;
    if (bio !== undefined) user.bio = bio;

    // Return a success response with the updated user information
    return res.status(200).send({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        profession: user.profession,
        bio: user.bio,
      },
    });

  } catch (error) {
    // Log the error and send an error response
    console.log("Error while updating userProfile: " + error.message);
    res.status(500).send({ message: "Failed to updating userProfile" });
  }
}

