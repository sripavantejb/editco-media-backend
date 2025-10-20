import { Router } from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile } from "../controllers/user.controller.js";
const router = Router();
// User registration route
router.post('/register', registerUser);
// User login route
router.post('/login', loginUser);
// Get user profile
router.get('/profile/:userId', getUserProfile);
// Update user profile
router.put('/profile/:userId', updateUserProfile);
export default router;
//# sourceMappingURL=user.route.js.map