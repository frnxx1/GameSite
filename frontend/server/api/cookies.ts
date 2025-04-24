import { getCookie, setCookie } from 'h3';

// export default defineEventHandler(event => {
//   // Read counter cookie
//   const access_token = getCookie(event, 'access_token');

//   console.log(access_token);
  
 
//   return { access_token };
// });
export default defineEventHandler((event) => {
	const cookies = parseCookies(event)
 
	return { cookies }
 })