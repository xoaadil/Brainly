import {Router} from "express"
import {loginValidation, signUpValidation} from "../middleware/authValidation"
import {login, signup} from "../controllers/authController"
const router=Router();
router.post("/signup",signUpValidation,signup);
router.post("/login",loginValidation,login);

export default router;