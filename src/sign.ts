import crypto from 'crypto';

export const signMessage = (message:string, apiSecret:string) => {
  return crypto.createHmac('sha512', apiSecret)
   .update(JSON.stringify(message))
   .digest('hex');
}