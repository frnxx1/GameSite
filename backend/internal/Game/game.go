package GameSite

import (
	db "GameSite/internal/DB"
	gm "GameSite/internal/model"
	"context"
	"errors"
	"log"
	"strconv"
	"time"

	"github.com/dimuska139/rawg-sdk-go/v3"
	"github.com/gin-gonic/gin"
)

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



func MainPage(num, perNum string, client *rawg.Client) ([]gin.H, error) {
	page, err := strconv.Atoi(num)
	if err != nil {
		return nil, err
	}
	perPage, err := strconv.Atoi(perNum)
	if err != nil {
		return nil, err
	}
	filter := rawg.NewGamesFilter().
		SetSearch("").
		SetPage(page).
		SetPageSize(perPage)

	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(time.Second*500))
	defer cancel()
	game, _, err := client.GetGames(ctx, filter)

	if err != nil {
		return nil, err
	}
	var results []gin.H
	for _, i := range game {
		desc, err := client.GetGame(ctx, i.ID)
		if err != nil {
			return nil, err
		}
		result := gin.H{
			"id":          i.ID,
			"name":        i.Name,
			"genre":       i.Genres,
			"image":       i.ImageBackground,
			"rating":      i.Rating,
			"description": desc.Description,
		}
		results = append(results, result)
	}
	
	return results, nil

}

func GamePage(id string, client *rawg.Client) ([]gin.H, error) {
	gameId, err := strconv.Atoi(id)
	if err != nil {
		return nil, err
	}
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(time.Second*500))
	defer cancel()

	var results []gin.H
	desc, err := client.GetGame(ctx, gameId)
	if err != nil {
		return nil, err
	}
	result := gin.H{
		"name":             desc.Name,
		"genre":            desc.Genres,
		"image":            desc.ImageBackground,
		"rating":           desc.Rating,
		"description":      desc.Description,
		"image_background": desc.ImageBackgroundAdditional,
	}
	results = append(results, result)

	return results, nil
}
