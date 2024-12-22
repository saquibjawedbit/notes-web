import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";


const verifyAdmin = asyncHandler((req, _, next) => {
    //Check if user Id is admin collection
    const user = req.user;
    if(user.role != "admin") {
        throw new ApiError(401, "Unauthorized Acesss");
    }
    next();
});

export default verifyAdmin;