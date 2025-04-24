import { getCookie, setCookie } from 'h3';

export default defineEventHandler(event => {
  // Read counter cookie
  const refresh_token = getCookie(event, 'refresh_token');

  console.log(refresh_token);
  
 
  return { refresh_token };
});