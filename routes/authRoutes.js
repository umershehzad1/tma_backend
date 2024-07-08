const app = require('express');
const {  signInController, signInWithGoogleController, verifyUser, verifyOTP, createResetSession, resetPassword, generateOTP, signupWithCredentials, signupWithGoogle } = require('../controller/authController');

const router = app.Router();

router.post('/signupWithGoogle', signupWithGoogle);
router.post('/signupWithCredentials', signupWithCredentials);

router.post('/sign-in', signInController);
router.post('/google-signin', signInWithGoogleController);
// generateOTP
// router.post('/generateOTP', verifyUser, generateOTP);
// router.post('/verifyOTP', verifyUser, verifyOTP);
// router.get("/createResetSession", createResetSession);
// router.post('/resetPassword', verifyUser, resetPassword);
module.exports = router;
