export default defineEventHandler((event) => {
	const cookies = parseCookies(event)
	console.log('куки:', cookies);
	 
	return {cookies}
})