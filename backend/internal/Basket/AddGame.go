package GameSite

import (
	db "GameSite/internal/DB"
	md "GameSite/internal/model"
	"context"
	"log"
	"strconv"
	"time"

	"github.com/dimuska139/rawg-sdk-go/v3"
)

func AddGame(id string, client *rawg.Client) error {
	var gameInfo md.Games

	gameId, err := strconv.Atoi(id)
	if err != nil {
		log.Println(err, "Неверный ID")
	}
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(time.Second*500))
	defer cancel()

	desc, err := client.GetGame(ctx, gameId)
	if err != nil {
		log.Println(err, "Нет игр с таким ID")
	}

	gameInfo = md.Games{
		Id:          desc.ID,
		Name:        desc.Name,
		Description: desc.Description,
		Image:       desc.ImageBackground,
	}
	res := db.GlobalDB.Find(&gameInfo, "id = ?", gameId)
	if res.RowsAffected == 0 {
		db.GlobalDB.Create(&gameInfo)
		if res.RowsAffected == 0 {
			log.Println("Ошибка добавления в корзину")
		}
	}

	return nil
}
