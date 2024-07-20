import { defineStore } from "pinia"


export const useGamesStore = defineStore('gamesStore', () => {

	const getGames = async (page:number) => {
		const { data: responce } = await useFetch(() => `http://localhost:3001?page=${page}&perPage=20`)
		return responce.value
	}
	
	const getOneGame = async(gameId) => {
		const { data: response } = await useFetch(() => `http://localhost:3001/${gameId}` );
		return response.value
	}

	return { 
		getGames, getOneGame
	}

 })


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
