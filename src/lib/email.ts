// Mock email utility for Phase 2 development.
// In a real production environment, this would use Resend or SendGrid.

export async function sendWelcomeEmail(email: string, name: string) {
  console.log("=========================================");
  console.log(`[EMAIL_MOCK] Sending Welcome Email...`);
  console.log(`To: ${email}`);
  console.log(`Subject: Welcome to EduGlobe Academy, ${name}!`);
  console.log(`Body: We are thrilled to have you on board. Start exploring the world of AI-powered education!`);
  console.log("=========================================");
  return true;
}

export async function sendVerificationEmail(email: string, token: string) {
  console.log("=========================================");
  console.log(`[EMAIL_MOCK] Sending Verification Email...`);
  console.log(`To: ${email}`);
  console.log(`Subject: Please verify your email address`);
  console.log(`Body: Click the following link to verify your email: http://localhost:3000/verify?token=${token}`);
  console.log("=========================================");
  return true;
}
