import { Router } from "express";
import { adminLogin, getAllSubmissions, getSubmissionById, updateSubmissionStatus, deleteSubmission } from "../controllers/admin.controller.js";
const router = Router();
// Admin login route
router.post('/login', adminLogin);
// Get all contact form submissions
router.get('/submissions', getAllSubmissions);
// Get specific submission
router.get('/submissions/:id', getSubmissionById);
// Update submission status
router.put('/submissions/:id/status', updateSubmissionStatus);
// Delete submission
router.delete('/submissions/:id', deleteSubmission);
export default router;
//# sourceMappingURL=admin.route.js.map