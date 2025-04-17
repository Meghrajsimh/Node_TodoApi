import express from "express";
import { getAllUser, getUserDetails, login, register, userLogout } from "../controller/User.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all",getAllUser)
router.post('/login',login);

router.post('/register',register);

router.get("/me",isAuth,getUserDetails)


router.get('/logout',userLogout);



export default router;