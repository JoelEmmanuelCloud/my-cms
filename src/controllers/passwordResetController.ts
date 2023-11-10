import nodemailer from 'nodemailer';
import UserModel from '../models/users';
import { NotFoundError } from '../errors/api-errors';
import { createJWT } from '../utils/jwt';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendResetPasswordEmail(
    email: string,
    resetToken: string,
): Promise<void> {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reset Your Password',
        text: `To reset your password, click the following link: http://yourapp.com/reset-password?token=${resetToken}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Reset password email sent');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send reset password email');
    }
}

async function requestPasswordReset(email: string): Promise<string> {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new NotFoundError('User not found');
    }

    const resetToken = createResetToken(user._id);

    user.passwordResetToken = resetToken;
    user.passwordResetTokenExpiry = new Date(Date.now() + 3600000);

    await user.save();

    await sendResetPasswordEmail(user.email, resetToken);

    return 'Password reset instructions sent to your email.';
}

function createResetToken(_id: string): string {
    const payload = { _id };
    return createJWT({ payload });
}

export { requestPasswordReset };
