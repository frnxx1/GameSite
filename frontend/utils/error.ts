const ERROR_CODES = {
	"Invalid User Credentials": 'Неверные учетные данные пользователя',
	'{"Error":"Error Creating User "}{"Message":"Sucessfully Register"}': "Пользователь с таким email уже существует"

}

export function eError(code:string) {
	return ERROR_CODES[code] ? ERROR_CODES[code] : "Неизвестная ошибка"
}