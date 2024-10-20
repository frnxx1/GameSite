export default defineEventHandler(async (event) => {
	const access_token = getCookie(event, 'access_token')
 
	console.log("из куков токен" + access_token);
	
	return { access_token }
 })