import { defineStore } from "pinia"


export const useGamesStore = defineStore('gamesStore', () => {

	const games = ref([]) //стейт для всех игр
	const searchGames = ref([]) // стейт для найденных игр
	const loading = ref(false)

	//постраничное получение списка игр
	const getGames = async (page:number) => {
		const { data: responce } = await useFetch(() => `http://localhost:3001?page=${page}&perPage=40`)
		games.value = games.value.concat(responce.value.game)
		return responce.value
	}
	
	//получаем конкретную игру при нажатии по айди
	const getOneGame = async(gameId) => {
		const { data: response } = await useFetch(() => `http://localhost:3001/${gameId}` );
		return response.value
	}

	//поиск по играм по названию
	const searchingGame = async(searchName) => {
		loading.value = true
		const {data:responce, pending} = await useFetch('http://localhost:3001/game/search', {
			method: 'POST',
			body: searchName
		})
	
		console.log(responce.value);
		searchGames.value = responce.value.game
		loading.value = false	
	}

	return { 
		getGames, getOneGame, games, searchingGame, searchGames, loading
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
