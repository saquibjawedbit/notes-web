import {asyncHandler} from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import ApiResponse from '../utils/ApiResponse.js';


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
   .cookies("accessToken", accessToken, options)
   .cookies("refreshToken", refreshToken, options)
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
            $set: {
                refreshToken: undefined,
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
    const {refreshToken} = req.cookies.refreshToken || req.body.refreshToken;
    
    if(!refreshToken) {
        throw new ApiError(400, "Refresh Token is Required");
    }

});

export  {
    registerUser, 
    loginUser,
    logoutUser,
};