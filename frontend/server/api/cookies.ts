// export default defineEventHandler(async (event) => {
// 	const cookie = getCookie(event, 'refresh_token')
 
// 	console.log("cookie: " + cookie);
	
// 	return { cookie: cookie }
//  })

export default defineEventHandler((event) => {
	const cookies = parseCookies(event)
	console.log(cookies);
	
 
	return {cookies}
 })
// export default defineEventHandler(async (event) => {
// 	const cookies = getHeader(event, 'cookie')
 
// 	console.log("cookies: " + cookies);
	
// 	return cookies
//  })