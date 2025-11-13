import { Router } from "express";
import { 
  registerUser, 
  loginUser, 
  getUserProfile,
  updateUserProfile,
  googleLogin
} from "../controllers/user.controller.js";

const router = Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// Google login route
router.post('/google-login', googleLogin);

// Get user profile
router.get('/profile/:userId', getUserProfile);

// Update user profile
router.put('/profile/:userId', updateUserProfile);

export default router;

