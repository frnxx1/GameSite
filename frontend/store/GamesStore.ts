import { defineStore } from "pinia"

export const useGamesStore = defineStore('gamesStore', () => {

	const games = ref([]) //стейт для всех игр
	const loading = ref(false)
	const gamesFoundBy = ref([]) // стейт для игр, найденных по жанру или имени
	const genre = ref('')
	const isSearchByName = ref(false) //если true, то кнопка "загрузить еще" задизейблится

	//постраничное получение списка игр
	const getGames = async (page:number) => {
		const { data: responce } = await useFetch(() => `http://localhost:3001?page=${page}&perPage=20`)
		games.value = games.value.concat(responce.value.game)
		console.log(responce.value);
		return responce.value
	}
	
	//получаем конкретную игру при нажатии по айди
	const getOneGame = async(gameId) => {
		const { data: response } = await useFetch(() => `http://localhost:3001/${gameId}` );
		return response.value
	}

	//поиск по играм по названию перепиши
	const searchByName = async(searchName) => {   
		//чтобы задизейблилась кнопка "загрузить еще", т.к. при поиске по имени
		//сервер отпраывляет только 20 игр
		isSearchByName.value = true 
		
		loading.value = true
		const {data:responce} = await useFetch('http://localhost:3001/game/search', {
			method: 'POST',
			body: searchName
		})

		console.log(responce.value);
		gamesFoundBy.value = responce.value.game
		loading.value = false	
	}

	//поиск по играм по жанру 
	const searchByGenre = async (searchGenre, page:number) => {
		loading.value = true	
		isSearchByName.value = false 
		//повторный запрос по жанру, добавляем следующую страницу 
		if(genre.value === searchGenre) {
			const { data: responce } = await useFetch(() => `http://localhost:3001/genre/${searchGenre}?page=${page}&perPage=20`)
			gamesFoundBy.value = gamesFoundBy.value.concat(responce.value)
			loading.value = false	
			return responce.value

		} else {
			//первичный запрос по жанру, перезаписываем стейт с массивом
			genre.value = searchGenre
			const { data: responce } = await useFetch(() => `http://localhost:3001/genre/${searchGenre}?page=${page}&perPage=20`)
			gamesFoundBy.value = responce.value
			loading.value = false	
			return responce.value
		}
	}
	return { 
		getGames, getOneGame, games, searchByName, loading, searchByGenre, gamesFoundBy, genre, isSearchByName
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
