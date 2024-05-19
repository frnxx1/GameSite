package GameSite

import (
	db "GameSite/internal/DB"
	gm "GameSite/internal/model"
	"errors"
	"log"

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

func TestFunc(ctx *gin.Context) {
	data := gm.Games{
		Name:        "123",
		Description: "123",
		Image:       "123",
	}
	
	if err := ctx.ShouldBindJSON(&data); err != nil {
		ctx.JSON(404, gin.H{"error": err.Error()})
	}
	
	ctx.JSON(200, data)
}
