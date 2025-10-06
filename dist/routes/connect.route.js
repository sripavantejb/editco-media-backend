import { Router } from "express";
import { postDetails } from "../controllers/connect.controller.js";
const router = Router();
router.post('/post', postDetails);
export default router;
//# sourceMappingURL=connect.route.js.map