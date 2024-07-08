const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db/models");
const admin = require("../firebase/firebase");
const sendMail = require("../utils/sendMail");
const otpGenerator = require("otp-generator");
const crypto = require('crypto');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
/*
path : https://localhost:4000/api/auth/sign-up
body : {
  email : password,
  password : password,
  contactNumber : contactNumber,
    
}

*/
module.exports.signupWithGoogle =  async (req, res) => {
  try {
    const { token, name, contactNumber, role } = req.body;
    if (!token) {
      return res.status(400).json({
        message: "Please provide a token",
      });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email } = decodedToken;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const newUser = await User.create({
      name,
      email,
      role : role || 'user',
      google_token : token,
      phone : contactNumber,
    });

    if (!newUser) {
      return res.status(400).json({
        message: "Unable to create new user",
      });
    }

    const result = newUser.toJSON();
    delete result.deletedAt;
    return res.status(201).json({
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
};

// Signup with Credentials Endpoint
module.exports.signupWithCredentials =  async (req, res) => {
  try {
    // const { name, contactNumber, password, token } = req.body;
    const { name, contactNumber, token, role } = req.body;
    if(!token){
      return res.status(400).json({
        message: "Please provide a token",
      });
    }
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email } = decodedToken;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const newUser = await User.create({
      name,
      email,
      role : role || 'user',
      phone: contactNumber,
    });

    if (!newUser) {
      return res.status(400).json({
        message: "Unable to create new user",
      });
    }
    const result = newUser.toJSON();
    delete result.deletedAt;
    return res.status(201).json({
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
};
module.exports.signInController = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        message: "Please provide a token",
      });
    }
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email } = decodedToken;
    let userExist = await User.findOne({
      where: {
        email,
      },
    });
    if (!userExist) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const generateNewToken = generateToken({ id: userExist.id, role: userExist.role});
    return res.status(200).json({
      success : true,
      message: "User logged in successfully",
      data: generateNewToken,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
};

module.exports.signInWithGoogleController = async (req, res) => {
  try {
    const idToken = req.body.token;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;
    let existingUser = await User.findOne({ where: { email: email } });
    if (!existingUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const token = generateToken({ id: existingUser.id, role: existingUser.role});
    return res.status(200).json({
      success : true,
      message: "User logged in successfully",
      token: token,
    });
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
};

module.exports.verifyUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    // Check the user existence
    const userExist = await user.findOne({ where: { email } });
    if (!userExist) {
      return res.status(404).send({ error: "User not found" });
    }
    req.user = userExist;
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
};
// generate OTP
// module.exports.generateOTP = async (req, res) => {
//   try {
//     const userEmail = req.body.email;
//     console.log("Req.body: ", req.body);
//     const userExist = await user.findOne({ where: { email: userEmail } });
//     if (!userExist) {
//       return res.status(404).json({ error: "User not found" });
//     }

//        let tomorrow = new Date();
//         tomorrow.setDate(new Date().getDate()+1);
//         userExist.resetPasswordCode = otpGenerator.generate(6, {
//           upperCaseAlphabets: false,
//           specialChars: false,
//         });
//         userExist.resetPasswordExpires = tomorrow;
//         console.log("userExist : ", userExist);
//         await userExist.save()

//     await sendMail({
//       email: userExist.email,
//       subject: "Verify OTP",
//       text: `Your Password Recovery OTP is: ${req.app.locals.OTP}. Verify and Recover your password.`,
//       html: `
//         <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
//           <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
//             <h2 style="text-align: center; color: #333333;">Click to this link to reset your password</h2>
//             <div style="text-align: center; margin: 20px 0;">
//              <img alt="logo" loading="lazy" width="160" height="60" decoding="async" data-nimg="1" style="color:transparent" srcset="https://res.cloudinary.com/dazktwghd/image/upload/v1/semantic-tribe//logo.png 1x, https://res.cloudinary.com/dazktwghd/image/upload/v1/semantic-tribe//logo.png 2x" src="https://res.cloudinary.com/dazktwghd/image/upload/v1/semantic-tribe//logo.png">
//             </div>
//             <h3 style="text-align: center; color: #333333;">Hello ${userExist.name},</h3>
//             <p style="color: #555555; text-align: center;">
//               Please use the following OTP to verify your account:
//             </p>
//             <div style="text-align: center; margin: 20px 0;">
//               <span style="background-color: #e8ffdf; padding: 10px 20px; font-size: 24px; border-radius: 5px; display: inline-block;">
//                 ${userExist.resetPasswordCode}
//               </span>
//             </div>
//             <p style="color: #555555; text-align: center;">
//               This OTP is valid for the next 15 minutes.
//             </p>
//             <p style="color: #555555; text-align: center;">
//               Thank you for being a part of us.
//             </p>
//           </div>
//           <div style="text-align: center; margin-top: 20px; color: #777777;">
//             <p style="margin: 0;">© 2024 Exec9, Inc. All rights reserved.</p>
//             <p style="margin-top: 10px;">You received this email because you signed up with us.</p>
//           </div>
//         </div>
//       `,
//     });
//     return res.status(201).json({
//       success: true,
//       message: `Please check your email: ${userExist.email} to get the OTP`,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: "Internal server error...!" });
//   }
// };
// verifyOTP
// module.exports.verifyOTP = async function(req, res, next) {
//   try {
//     let msg = "Unknown error occurred.";
//     let statusCode = 500;
//     console.log("REq bodasdsay : ", req.body);
//     const { email, otp } = req.body;
//     const userExist = await user.findOne({ where: { email, resetPasswordCode: otp } });
    
//     if (!userExist) {
//       console.log("waleeeeeed::1");
//       msg = "Invalid code!";
//       statusCode = 404;
//     } else if (userExist.resetPasswordExpires <= new Date()) {
//       console.log("waleeeeeed:2");
//       msg = "The code has expired!";
//       statusCode = 410;
//     } else {
//       console.log("waleeeeeed::3");
//       const verificationToken = crypto.randomBytes(20).toString('hex');
//       userExist.verificationToken = verificationToken; // Save verification token to user
//       await userExist.save();

//       return res.status(200).json({
//         success: true,
//         message: "OTP verified successfully.",
//         verificationToken,
//       });
//     }

//     return res.status(statusCode).json({
//       success: false,
//       message: msg,
//     });

//   } catch (err) {
//     console.error("Error in verifyOTP:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// }
// I only provide the access of this route only once to reset the password
// successfully redirect the user when the OTP is valid
// module.exports.createResetSession = async (req, res) => {
//   if (req.app.locals.resetSession) {
//     return res.status(201).send({ flag: req.app.locals.resetSession });
//   }
//   return res.status(404).send({ error: "Session expired!" });
// };

// module.exports.resetPassword = async (req, res) => {
//   const { email } = req.body;
//   try {
//     if (!req.app.locals.resetSession) {
//       return res.status(440).send({ error: "Session expired!" });
//     }
//     const user = await user.findOne({ email });
//     if (!user) {
//       return res.status(404).send({ error: "User not found" });
//     }
//     try {
//       // const hashPassword = await bcrypt.hash(password, 10);
//       await user.findByIdAndUpdate(user._id, { password: hashPassword });
//       req.app.locals.resetSession = false;
//       return res.status(201).send({ msg: "Password reset successful!" });
//     } catch (error) {
//       return res.status(500).send({ error: "Unable to hash the password" });
//     }
//   } catch (error) {
//     return res.status(500).send({ error: "Internal server error" });
//   }
// };






