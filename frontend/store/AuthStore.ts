import { defineStore } from "pinia"
import { useGlobalStore } from "./index"
import {eError} from "../utils/error"
import { useRouter } from "vue-router"
import { jsx } from "vue/jsx-runtime"
const router = useRouter()


export const useAuthStore = defineStore('authStore', () => {

	const accessToken = ref({})
	const refreshToken = ref({})
	const user = ref()

	const login = async (values) => {
		const {data:responce, error, status} = await useFetch('http://localhost:3001/api/public/login', {
			method: 'POST',
			credentials: 'include',
			body: values,
			onResponse(){
				console.log('запрос запрос');
			}
		})
		console.log(responce);
		console.log(error);
		console.log(status);
		
		if (status.value === "success") {
			console.log(responce);
		}

		if (error.value) {
			const globalStore = useGlobalStore()
			console.log(eError(error.value.data.Error));
			globalStore.setMessage(eError(error.value.data.Error), 'error')			
		}
		console.log(responce.value);
		return responce.value
	}

	// проверяем валидность accesstoken
	const checkToken = async () => {

		// получаем значение аксес токена из кук
		const {data} = await useFetch('/api/tokens')
		accessToken.value = data.value?.cookies.access_token
		console.log(accessToken.value);
		
		// если в куках нет аксес токена
		if(data.value?.cookies.access_token === undefined) {
			console.log('отработало условие аксес токен = undefined');
			// получаем рефреш токен из кук и помещаем в переменную 	
			refreshToken.value = data.value?.cookies.refresh_token
			// получаем новый аксес с пом. рефреша
			const newToken =	await refreshTokenFunction()
			// делаем запрос прокидывая новый аксес
			accessToken.value = newToken
			const {data:responce, error, status} = await useFetch('http://localhost:3001/api/protected/profile', {
				credentials: 'include',
				headers: accessToken.value ? {Authorization: `Bearer ${accessToken.value}` } : {},
			})
			user.value = responce.value.User

			return responce
		} //!тут else? чтобы дважды не делать запрос? 

		// если в куках есть аксес токен, то делаем запрос
		// в заголовок помещаем значение аксеса из кук
		const {data:responce, error, status} = await useFetch('http://localhost:3001/api/protected/profile', {
			credentials: 'include',
			headers: accessToken.value ? {Authorization: `Bearer ${accessToken.value}` } : {},
		})
		
		console.log(responce.value);
		user.value = responce.value.User
		return responce
	}

	// функция получения нового аксес с помощью рефреш токена
	const refreshTokenFunction = async function () {
		// ранее полученный рефреш помещаем в заголовок запроса
		const {data: tokens, error, status} = await useFetch("http://localhost:3001/api/protected/profile", {
			credentials: 'include',
			headers: refreshToken.value ? {Authorization: `Bearer ${refreshToken.value}` } : {},
			// headers: refreshToken ? {Authorization: `Bearer ${refreshToken}` } : {},
		})
		console.log(tokens.value.Token);
		console.log(error);
		console.log(status);
		
		
		if (status.value === "success") {
			console.log('токен успешно обновлен');
			return tokens.value.Token
		} else {
		// если рефреш токен еще актуален, то просим пользователя авторизоваться еще раз
		// допиши тут логику с редиректом
			console.log("Токен не обновился")
			console.log(error)
			const globalStore = useGlobalStore()
			globalStore.setMessage(eError(error.value.data.Error), 'error')		
		}
		return tokens.value.Token
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
		// isAuth.value = false
	}

	const isAuth =  computed ( async () => {
		const {data} = await useFetch('/api/tokens')
		console.log(!!data.value?.cookies.access_token)
		
		return !!data.value?.cookies.access_token
	})
	
	return { 
		login, 
		signup, 
		isAuth, 
		logout, checkToken, refreshToken, accessToken, user, refreshTokenFunction
		// accessTokenComputed
	}

})