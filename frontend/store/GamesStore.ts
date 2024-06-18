import { defineStore } from "pinia"


export const useGamesStore = defineStore('gamesStore', () => {

	// const games = ref([])

	const getGames = async () => {

		//Миша, ниже ссылку замени на http://localhost:3001
		const { data: responce } = await useFetch("https://jsonplaceholder.typicode.com/todos/", {
			// method: "POST",
			// headers: {
			// 	"Client-ID": "veftuzgvr6vae5133lstqxkz1rxy2u",
			// 	Authorization: "Bearer o6cnuwr9w0ladumfekz6fosygi55g8",
			// },
			// body: "fields *;",
		})
		// games.value = responce.value
		return responce.value
	}


	return { 
		getGames
	}
 })


// const getGames = async () => {
// 	const { data: responce } = await useFetch("https://api.igdb.com/v4/games", {
// 	method: "POST",
// 	headers: {
// 		"Client-ID": "veftuzgvr6vae5133lstqxkz1rxy2u",
// 		Authorization: "Bearer o6cnuwr9w0ladumfekz6fosygi55g8",
// 	},
// 	body: "fields *;",
// 	})
// 	games.value = responce
// }

// return {
// 	games
// }
// })

// export const useGamesStore = defineStore('gamesStore', {
// 	state: () => ({
// 		games:[]
// 	}),
// 	  actions: {
//     	async getGames() {
//    	   const {data: games} = await useFetch('https://api.igdb.com/v4/games', {
// 			method: 'POST',
// 			headers: {
// 			'Client-ID': 'veftuzgvr6vae5133lstqxkz1rxy2u',
// 			Authorization: 'Bearer o6cnuwr9w0ladumfekz6fosygi55g8',
// 			},
// 			body: 'fields *;'
//       })

//     },
//   },
// })

// const fakeStoreUrl = 'https://fakestoreapi.com'

// export interface Product {
//   id: number
//   title: string
//   price: number
//   description: string
//   category: string
//   image: string
// }

// interface ProductState {
//   items: Record<string, Product>
//   ids: number[]
// }

// export const useGamesStore = defineStore({
//   id: 'products', // это id стора, уникальный

//   state: (): ProductState => ({
//     items: {},
//     ids: [],
//   }),

//   getters: {
//  list(): Product[] {
//    return this.ids.map(i => this.items[i])
//  },

//  loaded(): boolean {
//    return this.ids.length > 0
//  },
//   },

//   actions: {
//     async fetchAll() {
//       if (this.loaded)
//         return

//       const res = await fetch(`${fakeStoreUrl}/products`)
//       const data: Product[] = await res.json()
//       this.ids = data.map((product) => {
//         this.items[product.id] = product
//         return product.id
//       })
//     },
//   },
// })
