import { useAuthStore } from "~/store/AuthStore"
const authStore = useAuthStore()


export default defineNuxtRouteMiddleware((to, from) => {
	// isAuthenticated() is an example method verifying if a user is authenticated
	// if (authStore.isAuth === false) {
	//   return navigateTo('/auth')
	// }
 })