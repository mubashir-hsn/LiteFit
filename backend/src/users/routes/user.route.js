import express from 'express'
import { changePassword, deleteUser, editUserProfile, getAllUsers, login, logout, register, updateUserRole, verifyExistedUserEmail, verifyUserEmail } from '../controllers/user.controller.js';
import { isVerifiedUser } from '../../middleware/isVerifiedUserEmail.js';
import verifyToken from '../../jwt/verifyToken.js';
import { verifyAdmin } from '../../jwt/VerifyAdmin.js';

const router = express.Router();

router.post('/register', register)
router.post("/verifyemail" , verifyUserEmail);
router.post("/verifyexistedemail" , verifyExistedUserEmail);
router.post('/login',isVerifiedUser,login)
router.post('/logout',logout)
router.post('/changepassword',changePassword)
router.patch('/edit-profile',verifyToken,editUserProfile)
router.get('/get-all-users', verifyToken ,getAllUsers)
router.delete('/delete-user/:id',verifyToken, verifyAdmin ,deleteUser)
router.put('/edit-role/:id', verifyToken, verifyAdmin ,updateUserRole)

export default router;