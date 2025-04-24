// import { useGlobalStore } from "../store/index"

export default defineNuxtRouteMiddleware( async (to, from) => {
	//! сейчас у тебя есть 2 варинта пролучения токенов из кук
	//! в папке api/tokens и api/cookies. Походу последний работает лучше. 
	//!И допиши защиут на страницу. Она пока что не работает.  

	// const headers = useRequestHeaders(['cookies'])
	// console.log(headers);
	
	const requestFetch = useRequestFetch()
  	const { data: forwarded } = await useAsyncData(() => requestFetch('/api/cookies'))
	console.log(requestFetch);
	console.log(forwarded);

	if(!forwarded.value?.cookies.access_token){
		if(!forwarded.value?.cookies.refresh_token){
			return navigateTo('/auth')	
		} 

		const {data: tokens, error, status} = await useFetch("http://localhost:3001/api/protected/profile", {
			credentials: 'include',
			headers: forwarded.value?.cookies.refresh_token ? {Authorization: `Bearer ${forwarded.value?.cookies.refresh_token}` } : {},

		})
		
		if (status.value === "success") {
			console.log(status);
			console.log(tokens);
			//? возможно тут надо переписывать логину на странце user 
			//? тут мы получаем новый access_token и данные пользователя. 
			//? было бы логично тут их прокидывать на страницу, а на странице убрать запрос на проверку access_token.
			//? также необходимо убрать повторяющийся код 

		} else {
			console.log(error);
			return navigateTo('/auth')	
		}
	}




	// const cookieHeaders = useRequestHeaders(['cookie'])
	// console.log(cookieHeaders);

	

	// console.log('проверка авторизации');
	// const accessToken = useFetch('/api/cookies')
	// console.log(accessToken.data.value?.access_token);



	// if (!accessToken.data.value?.access_token) {

		// const headers = useRequestHeaders(['cookie'])

		// const tokens = await $fetch("http://localhost:3001/api/protected/profile", {
		// 	credentials: 'include',
		// 	headers: useRequestHeaders(['cookie']) ? {Authorization: `Bearer ${refreshToken}` } : {},
		// })
	// }
			// 	const refreshToken = useFetch('/api/cookies_ref')
			// 	console.log("refresh from cookie", refreshToken.data.value?.refresh_token);
			// 	if(!refreshToken.data.value?.refresh_token){
		
			// 		return navigateTo('/auth')	
			// 	} else {
			// 		const {data: tokens, error, status} = await useFetch("http://localhost:3001/api/protected/profile", {
			// 			credentials: 'include',
			// 			headers: refreshToken ? {Authorization: `Bearer ${refreshToken}` } : {},
			// 		})
			// 		console.log(tokens);
			// 		console.log(status);
			// 		if(status.value === "success") {
			// 			return 
			// 		} else {
			// 			console.log(error)
			// 			const globalStore = useGlobalStore()
			// 			globalStore.setMessage(eError(error.value.data.Error), 'error')	
			// 			return navigateTo('/auth')	
			// 		}
			// 	}
				
			// } else {
			// 	console.log('token is it!');
			// 	return
			// }

	//-------//
	// console.log('проверка авторизации');
	// const accessToken = $fetch('/api/cookies')
	// const refreshToken = $fetch('/api/cookies_ref')
	// console.log(accessToken);
	// console.log(refreshToken);
	// if (!accessToken){
	// 	return navigateTo('/auth')	
	// }
	
//-------------------------------//
	// const headers = useRequestHeaders(['cookie'])
	// console.log(headers);

	//-------//
	// async function getCurrentUser() {
	// return await $fetch('/api/me', { headers: headers.value })
	// }
	//-------//


//-----------------------------------------------//
	// console.log('проверка авторизации');
	// const accessToken = useFetch('/api/cookies')
	// console.log(accessToken.data.value?.access_token);
	// if (!accessToken.data.value?.access_token) {
	// 	const refreshToken = useFetch('/api/cookies_ref')
	// 	console.log("refresh from cookie", refreshToken.data.value?.refresh_token);
	// 	if(!refreshToken.data.value?.refresh_token){

	// 		return navigateTo('/auth')	
	// 	} else {
	// 		const {data: tokens, error, status} = await useFetch("http://localhost:3001/api/protected/profile", {
	// 			credentials: 'include',
	// 			headers: refreshToken ? {Authorization: `Bearer ${refreshToken}` } : {},
	// 		})
	// 		console.log(tokens);
	// 		console.log(status);
	// 		if(status.value === "success") {
	// 			return 
	// 		} else {
	// 			console.log(error)
	// 			const globalStore = useGlobalStore()
	// 			globalStore.setMessage(eError(error.value.data.Error), 'error')	
	// 			return navigateTo('/auth')	
	// 		}
	// 	}
		
	// } else {
	// 	console.log('token is it!');
	// 	return
	// }
	



// })
})