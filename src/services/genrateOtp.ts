import speakeasy from 'speakeasy'; 
  
  export async function generateOtp()
  
  {
    try {
        const secret =await speakeasy.generateSecret({ length: 20 }); 
    const code = speakeasy.totp({ 
        secret: secret.base32,     
        encoding: 'base32'
    }); 
    return code;
    } catch (error) {
        console.log(error);
        return "0000000";
    }
  }
  
  