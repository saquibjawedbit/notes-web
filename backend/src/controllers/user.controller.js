import {asyncHandler} from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import ApiResponse from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';


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
        "-password -refreshToken"
    );

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    res.status(201).
    json(
        new ApiResponse(200, createdUser, "User registered Succesfully")
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
        httpyOnly: true,
        secure: true,
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
        httpyOnly: true,
        secure: true,
   };

   return res.status(200)
   .clearCookie("accessToken", options)
   .clearCookie("refreshToken", options)
   .json(
        new ApiResponse(200, {}, "User logged Out"),
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

const changeCurrentUserPassword = asyncHandler(async (req, res) => {
    const {oldPassword, newPassword} = req.body;
    
    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if(!isPasswordCorrect) {
        throw new ApiError(401, "Old Password is Incorrect");
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
    logoutUser,
    refreshAccessToken,
    changeCurrentUserPassword,
    getCurrentUser,
    updateAccountDetails,
};