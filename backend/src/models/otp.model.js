import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expiredAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600 // Automatically delete documents after 10 minutes
    }
});

// Add pre-save hook to hash OTP
otpSchema.pre('save', async function(next) {
    if(!this.isModified('otp')) return next();
    this.otp = await bcrypt.hash(this.otp, 10);
    next();
});

otpSchema.methods.isOtpCorrect = async function(otp) {
    return await bcrypt.compare(otp, this.otp);
}

export const Otp = mongoose.model('Otp', otpSchema);