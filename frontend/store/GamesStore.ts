import { defineStore } from "pinia"

export const useGamesStore = defineStore('gamesStore', () => {

	const games = ref([]) //стейт для всех игр
	const gamesFoundByName = ref([]) // стейт для игр, найденных по имени
	const loading = ref(false)
	const gamesFoundByGenre = ref([]) // стейт для игр, найденных по жанру
	const pageSearch = ref(1)
	const genre = ref('')

	//постраничное получение списка игр
	const getGames = async (page:number) => {
		const { data: responce } = await useFetch(() => `http://localhost:3001?page=${page}&perPage=40`)
		games.value = games.value.concat(responce.value.game)
		console.log(responce.value);
		return responce.value
	}
	
	//получаем конкретную игру при нажатии по айди
	const getOneGame = async(gameId) => {
		const { data: response } = await useFetch(() => `http://localhost:3001/${gameId}` );
		return response.value
	}

	//поиск по играм по названию
	const searchByName = async(searchName) => {   
		loading.value = true
		const {data:responce} = await useFetch('http://localhost:3001/game/search', {
			method: 'POST',
			body: searchName
		})

		console.log(responce.value);
		gamesFoundByName.value = responce.value.game
		loading.value = false	
	}

	//! поиск по играм по жанру //отловить баг! кликаем жанр->кикаем кнопку загрузить еще -> кликаем жанр 
	//! подгружаются иггы повторно. Как вариант задизейблить кнопку жанра для предотв. повторного нажатия
	//? перепиши корявый код внизу
	const searchByGenre = async (searchGenre, page:number) => {
		loading.value = true	
		if((genre.value === searchGenre) && (pageSearch.value !== page)) {
			console.log('повторный круг')
			console.log(page);
			const { data: responce } = await useFetch(() => `http://localhost:3001/genre/${searchGenre}?page=${page}&perPage=20`)
			console.log(responce.value)

			gamesFoundByGenre.value = gamesFoundByGenre.value.concat(responce.value)

			console.log(gamesFoundByGenre.value)
			loading.value = false	
			return responce.value

		} else if(genre.value === searchGenre && pageSearch.value === page) {
			console.log('совпадает и жанр и страница, ничо не делаем');
			loading.value = false	
			return responce.value

		} else {
			console.log('другой жанр или первый запрос');
			genre.value = searchGenre
			// pageSearch.value = page
			console.log(searchGenre)
			console.log(genre)
			console.log(page);

			const { data: responce } = await useFetch(() => `http://localhost:3001/genre/${searchGenre}?page=${page}&perPage=20`)
			console.log(responce.value)

			gamesFoundByGenre.value = responce.value

			console.log(gamesFoundByGenre.value)
			loading.value = false	
			return responce.value
		}
	}
	return { 
		getGames, getOneGame, games, searchByName, gamesFoundByName, loading, searchByGenre, gamesFoundByGenre,
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
