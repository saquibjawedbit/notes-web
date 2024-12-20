import mongoose, {Mongoose, Schema} from "mongoose";
import bcrypt from "bcrypt";

const otpSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiredAt: {
        type: Date,
        default: Date.now() + 5 * 60 * 1000, // 5 minutes
    },
});

// This hook is called just before data is saved
otpSchema.pre("save", async function (next) {
    if(this.isModified("otp")) {        
        this.otp = await bcrypt.hash(this.otp, 10);
    }
    next();
});

otpSchema.methods.isOtpCorrect = async function (otp) {
    return await bcrypt.compare(otp, this.otp);
}


export const Otp = mongoose.model("Otp", otpSchema);