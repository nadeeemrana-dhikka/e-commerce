import speakeasy from 'speakeasy'; // Importing speakeasy library for OTP generation

export async function generateOtp() {
  try {
    const secret = await speakeasy.generateSecret({ length: 20 }); // Generating a secret for OTP with a length of 20 characters
    const code = speakeasy.totp({ 
      secret: secret.base32, // Using the base32-encoded secret for OTP generation
      encoding: 'base32' // Encoding type
    });
    return code; // Returning the generated OTP code
  } catch (error) {
    console.log(error); // Logging any errors that occur during OTP generation
    return "0000000"; // Returning a default value "0000000" in case of error
  }
}
