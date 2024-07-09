import express from 'express';
import {  signInWithCredentials, signInWithGoogle, signupWithCredentials, signupWithGoogle } from '../controller/authController';
import { signInWithCredentialsValidator, signInWithGoogleValidator, signupWithCredentialsValidator, signupWithGoogleValidator }  from '../validators/authValidator';

const router = express.Router();

router.post('/signupWithGoogle', signupWithGoogleValidator, signupWithGoogle);
router.post('/google-signin', signInWithGoogleValidator, signInWithGoogle);
router.post('/signupWithCredentials', signupWithCredentialsValidator, signupWithCredentials);
router.post('/sign-in', signInWithCredentialsValidator, signInWithCredentials);
export default router;
