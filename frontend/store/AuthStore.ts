import { defineStore } from "pinia"
import { useGlobalStore } from "./index"
import {eError} from "../utils/error"
import { useRouter } from "vue-router"
const router = useRouter()


export const useAuthStore = defineStore('authStore', () => {

//? разобраться с токенами

	const isAuth = ref(true)
	const accessToken = ref({})

	// const accessTokenComputed = computed( () => {
	// 	const {data: tokens} = useFetch('/api/cookies')
	// 	return tokens.value?.cookies.access_token		
	// })

	const login = async (values) => {
		const {data:responce, error, status} = await useFetch('http://localhost:3001/api/public/login', {
			method: 'POST',
			credentials: 'include',
			body: values,
			// headers: accessToken.value ? {Authorization: `Bearer ${accessToken.value}` } : {},
		})
		console.log(responce);
		
		if (status.value === "success") {
			// console.log(responce);
			isAuth.value = true
			console.log(isAuth.value);
		}

		if (error.value) {
			const globalStore = useGlobalStore()
			console.log(eError(error.value.data.Error));
			globalStore.setMessage(eError(error.value.data.Error), 'error')			
		}
		console.log(responce.value);
		return responce.value
	}

	const checkToken = async () => {

		const {data: tokens} = await useFetch('/api/cookies')
		
		accessToken.value = tokens.value?.cookies.access_token
		console.log("тест", tokens);
		

		console.log(accessToken.value);
		
		const {data:responce, error, status} = await useFetch('http://localhost:3001/api/protected/profile', {
			credentials: 'include',
			headers: accessToken.value ? {Authorization: `Bearer ${accessToken.value}` } : {},
		})
		console.log(responce);
		console.log(status);

		if (status.value === 'error') {
			// console.log(responce);
			try {
				const newToken = await refreshToken()
				accessToken.value = newToken
				useFetch('http://localhost:3001/api/public/login', {
					method: 'POST',
					// credentials: 'include',
					body: values,
					headers: {Authorization: `Bearer ${newToken}` },
				})
			} catch (error) {
				console.log(error);
			}
		} else if (status.value === "success") {
			console.log('токен обновился')
		}

		return responce.value
	}

	async function refreshToken () {
		
		const {data: tokens} = await useFetch('/api/cookies')
		console.log(tokens);
		console.log(tokens.value?.cookies.refresh_token);
		
		const refreshToken = tokens.value?.cookies.refresh_token
		console.log(refreshToken);
		
		
		const {data, error, status} = await useFetch("http://localhost:3001/api/protected/profile", {
			credentials: 'include',
			// headers: refreshToken.value ? {Authorization: `Bearer ${refreshToken.value}` } : {},
			headers: refreshToken ? {Authorization: `Bearer ${refreshToken}` } : {},
		})
		if (status.value === "success") {
			console.log('токен успешно обновлен');
			
			console.log(data);
			return data.value?.access_token
		} else {
			console.log(status);
			console.log(error);
			console.log("Токен не обновился");
		}
	}

	const signup = async (values) => {
	
		const {data:responce, error, status} = await useFetch('http://localhost:3001/api/public/signup', {
			method: 'POST',
			// headers: {'Content-Type': 'application/json'},
			// credentials: 'include',
			body: values
		})
				
		if (status.value === "success") {
			const globalStore = useGlobalStore()
			console.log(status.value);
			globalStore.setMessage("Регистрация успешна, войдите в систему", 'success')		
		}
		if (error.value) {
			console.log(error.value.data);
			const globalStore = useGlobalStore()
			globalStore.setMessage(eError(error.value.data), 'error')			
		}
		return responce.value
	}

	const logout = async (values) => {
		isAuth.value = false
	}
	


	return { 
		login, signup, isAuth, logout, checkToken, refreshToken, accessToken,
	}

})