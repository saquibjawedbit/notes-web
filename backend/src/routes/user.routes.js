import {Router} from "express";
import {
    registerUser, 
    loginUser,
    verifyUser,
    logoutUser, 
    refreshAccessToken, 
    getCurrentUser, 
    resetPassword,
    updateAccountDetails,
    forgetPassword,
    resendOTP,
} 
    from "../controllers/user.controller.js";
    
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/verify").post(verifyUser);
router.route("/reset-password").post(resetPassword);
router.route("/forget-password").post(forgetPassword);
router.route("/resend-otp").post(resendOTP);

//Spins Up The Server (Bypass sleep)
router.route("/start").get((req, res) => {
    res.send("Hello World");
});


//secured routes
router.route("/logout").post(verifyJWT ,logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/me").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);

export default router;