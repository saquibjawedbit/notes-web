import {asyncHandler} from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import ApiResponse from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
import {emailTemplate} from '../utils/emailTemplate.js';
import { Otp } from '../models/otp.model.js';
import sendEmail from '../utils/emailTransporter.js';


const generateAccessAndRefreshTokens = async (user) => {
    try {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken};
    }
    catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
}

const sendOTP = async (emailId, id) => {
    try {
        const otpCode = `${Math.floor(1000 + Math.random() * 9000)}`;
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: emailId,
            subject: "Verify Your Email",
            html: emailTemplate(otpCode),
        };

        // Delete any existing OTPs for this user
        await Otp.deleteMany({ userId: id });

        const expirationTime = new Date(Date.now() + 10 * 60 * 1000);
        console.log(`OTP will expire at: ${expirationTime}`);

        const otp = await Otp.create({
            userId: id,
            otp: otpCode,
            expiredAt: expirationTime
        });

        try {
            await sendEmail(mailOptions);
            console.log(`OTP sent successfully to ${emailId}`);
        } catch (emailError) {
            console.error("Email Error:", emailError);
            throw new ApiError(500, "Failed to send email");
        }

        return { success: true };
    }
    catch (error) {
        console.error("OTP Creation Error:", error);
        throw new ApiError(500, "Failed to send OTP");
    }
}


const registerUser = asyncHandler( async (req, res) => {
    const {emailId, password} = req.body;
    
    if ((emailId?.trim() === "" || !emailId) || (password?.trim() === "" || !password)) {
        throw new ApiError(400, "Email and Password are Required");
    }

    const userExist = await User.findOne({emailId: emailId});

    if(userExist) {
        throw new ApiError(409, "User with this email already exists !");
    }

    const user = await User.create({
        emailId: emailId.toLowerCase(),
        password: password,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -role"
    );

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    sendOTP(emailId, createdUser._id);

    res.status(201).
    json(
        new ApiResponse(200, {
            user: user,
        }, "User registered Succesfully"),
    );
});

const loginUser = asyncHandler(async (req, res) => {
    const {emailId, password} = req.body

    if(!password || !emailId) {
        throw new ApiError(400, "Username and Password is Required");
    }

    const user = await User.findOne({
        emailId: emailId,
    });

    if(!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid =  await user.isPasswordCorrect(password);

    if(!isPasswordValid) {
        throw new ApiError(401, "Password incorrect user credential");
    }

   const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user);

    // Convert the Mongoose document to a plain JavaScript object
    const userObject = user.toObject();

    // Remove sensitive fields
    delete userObject.password;
    delete userObject.refreshToken;

   const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
   };

   return res.status(200)
   .cookie("accessToken", accessToken, options)
   .cookie("refreshToken", refreshToken, options)
   .json(
        new ApiResponse(
            200,
            {
                user: userObject,
                accessToken,
            },
            "User logged in Successfully",
        )
   );


});

const verifyUser = asyncHandler(async (req, res) => {
    const {userId, otp} = req.body;

    if(!otp || !userId) {
        throw new ApiError(400, "OTP is Required");
    }

    const otpDoc = await Otp.findOne({userId});

    if(!otpDoc) {
        throw new ApiError(401, "OTP not found or already expired");
    }

    console.log(`Current time: ${new Date()}`);
    console.log(`OTP expiry time: ${otpDoc.expiredAt}`);

    // Check if OTP has expired
    if (Date.now() > otpDoc.expiredAt.getTime()) {
        await Otp.deleteMany({ userId });
        throw new ApiError(401, "OTP has expired. Please request a new one");
    }

    const validOTP = await otpDoc.isOtpCorrect(otp);

    if(!validOTP) {
        throw new ApiError(401, "Invalid OTP");
    }

    await Otp.deleteMany({userId});
    
    const user = await User.findByIdAndUpdate(
        userId,
        {
            verified: true,
        },
        {
            new: true,
        }
    ).select("-password -refreshToken");

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user);


    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
   };

   return res.status(200)
   .cookie("accessToken", accessToken, options)
   .cookie("refreshToken", refreshToken, options)
   .json(
        new ApiResponse(
            200,
            {
                user: user,
                accessToken,
            },
            "User Verified Successfully",
        )
   )
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
   };

   return res.status(200)
   .clearCookie("accessToken", options)
   .clearCookie("refreshToken", options)
   .json(
        new ApiResponse(200, {}, "User logged Out"),
   );
});  

const resendOTP = asyncHandler(async (req, res) => {
    const {userId} = req.body; 
    
    const user = await User.findById(userId);

    if(!user) {
        throw new ApiError(404, "User not found");
    }

    sendOTP(user.emailId, user._id);

    return res.status(200)
    .json(
        new ApiResponse(200, {}, "OTP Sent Successfully"),
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    
        if(!incomingRefreshToken) {
            throw new ApiError(400, "Refresh Token is Required");
        }
    
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);  
    
        const user = await User.findById(decodedToken?._id);
    
        if(!user) {
            throw new ApiError(401, "Invalid Refresh Token");
        }
    
        if(incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Invalid Refresh Token");
        }
    
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        };
    
        const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user);
    
        return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, {accessToken}, "Access Token Refreshed Successfully"),
        );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Refresh Token");
    }
});

const forgetPassword = asyncHandler(async (req, res) => {
    const {emailId} = req.body;
    const user = await User.findOne({ emailId: emailId });

    if(!user) {
        throw new ApiError(404, "User not found");
    }

    sendOTP(emailId, user._id);

    return res.status(200)
    .json(
        new ApiResponse(200, {id: user._id}, "Password Change Initiated"),
    );
});

const resetPassword = asyncHandler(async (req, res) => {
    const {newPassword, userId} = req.body;

    if(!newPassword || !userId) {
        throw new ApiError(400, "Password is Required");
    }


    const user = await User.findById(userId);

    if(!user) {
        throw new ApiError(404, "User not found");
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false});

    return res.status(200)
    .json(
        new ApiResponse(200, {}, "Password Changed Successfully"),
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = req.user;

    return res.status(200)
    .json(
        new ApiResponse(200, user, "User Details Fetched Successfully"),
    );
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const user = req.user;

    if(!req.body.class) {
        throw new ApiError(400, "Class is Required");
    }

    user.class = req.body.class;

    await user.save({validateBeforeSave: false});

    return res.status(200)
    .json(
        new ApiResponse(200, user, "User Details Updated Successfully"),
    );
});

export  {
    registerUser, 
    loginUser,
    verifyUser,
    logoutUser,
    refreshAccessToken,
    resetPassword,
    forgetPassword,
    getCurrentUser,
    updateAccountDetails,
    resendOTP,
};