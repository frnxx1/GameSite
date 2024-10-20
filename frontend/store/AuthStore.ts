import { defineStore } from "pinia"
import { useGlobalStore } from "./index"
import {eError} from "../utils/error"
import { useRouter } from "vue-router"
const router = useRouter()


export const useAuthStore = defineStore('authStore', () => {

	const accessToken = ref({})
	const user = ref()

	const login = async (values) => {
		const {data:responce, error, status} = await useFetch('http://localhost:3001/api/public/login', {
			method: 'POST',
			credentials: 'include',
			body: values,
		})
		console.log(responce);
		
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

	//? проверяем валидность accesstoken
	const checkToken = async () => {

		//? получаем значение аксес токена из кук
		const {data} = await useFetch('/api/accesstoken')
		accessToken.value = data.value?.access_token
		console.log('аксес из запроса', accessToken.value);

		if(accessToken.value === undefined) {
			const newToken = await refreshToken() 
			accessToken.value = newToken
		}

		//? делаем запрос на сервер для получения данных
		//? в заголовок помещаем значение аксеса из кук
		const {data:responce, error, status} = await useFetch('http://localhost:3001/api/protected/profile', {
			credentials: 'include',
			headers: accessToken.value ? {Authorization: `Bearer ${accessToken.value}` } : {},
		})
		
		console.log(responce);
		console.log(status);

		//? если запрос не прошел и вернулся статус с ошибкой
		if (status.value === 'error') {
			try {
				//? обновляем аксес с помощью рефреш токена
				const newToken = await refreshToken() 

				//? получаем новый аксес токен в переменную
				accessToken.value = newToken
				console.log('аксес после рефреша:', accessToken.value);
				
				//?делаем новый запрос на сервер с обновленным аксес токеном
				//? и получаем данные о пользователе с сервера
				const {data:responce, error, status} = await useFetch('http://localhost:3001/api/protected/profile', {
					credentials: 'include',
					headers: accessToken.value ? {Authorization: `Bearer ${accessToken.value}` } : {},
				})
				console.log("данные после рефреша", responce.value );
				user.value = responce.value.User.email

				//?возвращаем данные
				return responce.value.User.email

			} catch (error) {
				console.log(error);
			}
		} else {
			console.log('токен действует')
			user.value = responce.value
		}	
		return responce
	}

	async function refreshToken () {
		//? из куков получаем рефреш токен и складываем в переменную 
		const {data: tokens} = await useFetch('/api/cookies')	
		const refreshToken = tokens.value?.cookies.refresh_token
		
		//? делаем запрос на сервер, пуша в зоголовок рефреш токен
		const {data, error, status} = await useFetch("http://localhost:3001/api/protected/profile", {
			credentials: 'include',
			headers: refreshToken ? {Authorization: `Bearer ${refreshToken}` } : {},
		})
		//? если рефреш токен еще актуален, то получаем новый аксес токен
		//? и функцию выше продолжаем 
		if (status.value === "success") {
			console.log('токен успешно обновлен');
			console.log(data.value.Token);
			return data.value.Token
		} else {
			//? если рефреш токен еще актуален, то просим пользователя авторизоваться еще раз
			//! допиши тут логику с редиректом
			console.log("Токен не обновился")
			console.log(error)
			const globalStore = useGlobalStore()
			globalStore.setMessage(eError(error.value.data.Error), 'error')		
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
		// isAuth.value = false
	}
	
	return { 
		login, 
		signup, 
		// isAuth, 
		logout, checkToken, refreshToken, accessToken, user
		// accessTokenComputed
	}

})