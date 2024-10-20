<script setup lang="ts">
definePageMeta({
	middleware: 'auth'
})


import { useAuthStore } from "../store/AuthStore"
const authStore = useAuthStore()

const refreshToken = async function() {
	const { data, pending, error } = await useAsyncData("authStore", () => {
		return authStore.checkToken()
	});
}

const getAccessToken = function () {
	console.log(authStore.accessToken);
	
	// if(!authStore.accessTokenComputed) {
	// 	console.log('пустой');
	// } else {
	// 	console.log("токен", authStore.accessTokenComputed);
		
	// }
}


// const show = function () {
// 	const { data } = useFetch('/api/cookies')
// 	console.log(data);
	
// }
  
// const { data } = await useFetch('/api/cookies') 
// console.log(data.value);
// console.log(data.value.cookies.access_token);

// const access_token = data.value.cookies.access_token

// console.log(Object.entries(data));




</script>


<template>
	
 <h1 v-if="data">Страница пользователя с email: {{ data.email }} </h1>
 <h1 v-else> Не обновился токен</h1>
 <v-btn @click="refreshToken">
     Обновить токен
    </v-btn>
	 <v-btn @click="getAccessToken">
     Получить accessToken
    </v-btn>
</template>

<style></style>