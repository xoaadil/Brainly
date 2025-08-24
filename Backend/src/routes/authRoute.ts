import {Router} from "express"
import {signUpValidation} from "../middleware/authValidation"
import {signup} from "../controllers/authController"
const router=Router();
router.post("/signup",signUpValidation,signup);

export default router;