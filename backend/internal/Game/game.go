package GameSite

import (
	db "GameSite/internal/DB"
	gm "GameSite/internal/model"
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/dimuska139/rawg-sdk-go/v3"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func ViewIndex(ctx *gin.Context) {
	ctx.JSON(200, gin.H{"message": "123"})
}

func PostGameId(ctx *gin.Context, id string) (gm.Games, error) {
	var gameInfo gm.Games
	res := db.GlobalDB.Find(&gameInfo, "name = ?", id)
	if res.RowsAffected == 0 {
		return gameInfo, errors.New("err")
	}
	return gm.Games{
		Name:  gameInfo.Name,
		Image: gameInfo.Image,
	}, nil
}

func CreateGame(ctx *gin.Context) gm.Games {
	var gameInfo gm.Games
	if err := ctx.BindJSON(&gameInfo); err != nil {
		log.Fatal(err)
	}
	data := gm.Games{
		Name:        gameInfo.Name,
		Description: gameInfo.Description,
		Image:       "ссылка на картинку",
	}
	res := db.GlobalDB.Create(data)
	if res.RowsAffected == 0 {
		log.Fatal("error creating game")
	}
	return data
}

func PayItem(ctx *gin.Context) gm.Games {
	var gameInfo gm.Item
	if err := ctx.BindJSON(&gameInfo); err != nil {
		log.Fatal(err)
	}
	item := gm.Item{
		Id:    uuid.NewString(),
		Name:  gameInfo.Name,
		Desc:  gameInfo.Desc,
		Coast: gameInfo.Coast,
		Count: gameInfo.Count,
		Image: "ссылка на картинку",
	}
	data := gm.Games{
		Name: ctx.Param("name"),
		Item: item,
	}
	res := db.GlobalDB.Create(data)
	if res.RowsAffected == 0 {
		log.Fatal("error creating game1")
	}
	return data
}

func TestFunc(num string) []gin.H {
	config := rawg.Config{
		ApiKey:   "1e5f1a0a5590404f950a65bcdeeb19d4",
		Language: "ru",
		Rps:      5,
	}
	client := rawg.NewClient(http.DefaultClient, &config)
	page,err := strconv.Atoi(num)
	if err != nil {
		log.Println(err)
	}
	filter := rawg.NewGamesFilter().
		SetSearch("").
		SetPage(page).
		SetPageSize(20)

	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(time.Second*500))
	defer cancel()
	game, _, err := client.GetGames(ctx, filter)

	if err != nil {
		fmt.Println(err)
	}
	var results []gin.H
	for _, i := range game {
		desc,err := client.GetGame(ctx,i.ID)
		if err != nil {
			log.Println(err)
		}
		result := gin.H{
			"name":        i.Name,
			"genre":       i.Genres,
			"image":       i.ImageBackground,
			"rating":      i.Rating,
			"description": desc.Description,
		}
		results = append(results, result)
	}
	return results

}
