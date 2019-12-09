import crypto from 'crypto';

export const signMessage = (message, apiSecret) => {
  return crypto.createHmac('sha512', apiSecret)
   .update(JSON.stringify(message))
   .digest('hex');
}