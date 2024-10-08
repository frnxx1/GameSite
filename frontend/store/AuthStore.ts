import { defineStore } from "pinia"
import { useGlobalStore } from "./index"
import {eError} from "../utils/error"
import { useRouter } from "vue-router"
const router = useRouter()


export const useAuthStore = defineStore('authStore', () => {

//? разобраться с токенами

	const isAuth = ref(false)

	const login = async (values) => {
		const {data:responce, error, status} = await useFetch('http://localhost:3001/api/public/login', {
			method: 'POST',
			body: values
		})
		if (status.value === "success") {
			// console.log('статус:', status.value );
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

	const signup = async (values) => {
		const {data:responce, error, status} = await useFetch('http://localhost:3001/api/public/signup', {
			method: 'POST',
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
		// const {data:responce, error, status} = await useFetch('http://localhost:3001/api/public/login', {
		// 	method: 'POST',
		// 	body: values
		// })
		// if (error.value) {
		// 	const globalStore = useGlobalStore()
		// 	console.log(eError(error.value.data.Error));
		// 	globalStore.setMessage(eError(error.value.data.Error), 'error')			
		// }
		// return responce.value
	}
	


	return { 
		login, signup, isAuth, logout
	}

})