import { defineStore } from "pinia"


export const useGlobalStore = defineStore('globalStore', () => {

	const message = ref(null)

	const setMessage = function (textMessage, typeMessage) {

		message.value = {text: textMessage, type: typeMessage}
		
		setTimeout(() => {
			message.value = null
		}, 6000);
					
	}

	const clearMessage = function (message) {
		message.value = null
	}


	// const messageReactive = computed (() => message) 


	return { 
		message, 
		setMessage, 
		clearMessage, 
		// messageReactive
	}
})