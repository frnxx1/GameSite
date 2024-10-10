import { defineStore } from "pinia"
import { useGlobalStore } from "./index"
import {eError} from "../utils/error"
import { useRouter } from "vue-router"
const router = useRouter()


export const useAuthStore = defineStore('authStore', () => {

//? разобраться с токенами

	const isAuth = ref(false)
	const accessToken = ref(useCookie('token'))

	const login = async (values) => {
		const {data:responce, error, status} = await useFetch('http://localhost:3001/api/public/login', {
			method: 'POST',
			credentials: 'include',
			body: values,
			headers: accessToken.value ? {Authorization: `Bearer ${accessToken.value}` } : {},
		})
		console.log(responce);
		

		if (status.value === "401") {
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
			
		}
		
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

	async function refreshToken () {
		const refreshToken = useCookie("refreshToken")
		const {data, status} = await useFetch("http://localhost:3001/protected/profile", {
			method: 'POST',
			body: {refresh: refreshToken.value},
		})
		if (status.value === "success") {
			console.log(data);
			return data.value?.access
		} else {
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
		login, signup, isAuth, logout
	}

})