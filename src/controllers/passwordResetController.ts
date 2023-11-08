// Import necessary modules and dependencies
import nodemailer from 'nodemailer';
import  UserModel from '../models/users';
import { NotFoundError } from '../errors/api-errors';
import { createJWT } from '../utils/jwt';
// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // Your Yahoo email address
        pass: process.env.EMAIL_PASS, // Your Yahoo email password or app-specific password
    },
    authMethod: 'PLAIN'
});

// Function to send reset password email
async function sendResetPasswordEmail(email: string, resetToken: string): Promise<void> {
    // Create the email content
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reset Your Password',
        text: `To reset your password, click the following link: http://yourapp.com/reset-password?token=${resetToken}`,
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Reset password email sent');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send reset password email');
    }
}


// Function to handle password reset request
async function requestPasswordReset(email: string): Promise<string> {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new NotFoundError('User not found');
    }

    // Generate a reset token using JWT for the user
    const resetToken = createResetToken(user._id); // Assuming user._id is used to uniquely identify the user

    // Set the reset token and expiry in the user document
    user.passwordResetToken = resetToken;
    user.passwordResetTokenExpiry = new Date(Date.now() + 3600000); // Set an expiry time (e.g., 1 hour)

    await user.save();

    // Send the reset password email
    await sendResetPasswordEmail(user.email, resetToken);

    return 'Password reset instructions sent to your email.';
}

// Function to generate a reset token using JWT
function createResetToken(_id: string): string {
    const payload = { _id }; // Create payload with the user ID or any necessary information
    return createJWT({ payload });
}

export { requestPasswordReset };