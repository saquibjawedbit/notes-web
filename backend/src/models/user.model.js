import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        emailId : {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        password : {
            type: String,
            required: [true, "Password is Required"],
        },
        class:
            {
                type: String,
                enum: ["IX", "X", "XI", "XII", "JEE", "NEET"],
            
            }
        ,
        purchasedPdf: [
            {
                type: Schema.Types.ObjectId,
                ref: "Note"
            }
        ],
        transactionHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Transaction"
            }
        ],
        refreshToken : {
            type: String,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enums: ["user", "admin"],
            default: "user"
        }
    },  
    {
        timestamps  : true,
    }
);


// This hook is called just before data is saved
userSchema.pre("save", async function (next) {
    if(this.isModified("password")) {        
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            emailId: this.emailId,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

export const User = mongoose.model("User", userSchema);