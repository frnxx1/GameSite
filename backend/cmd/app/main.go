package main

import (
	db "GameSite/internal/DB"
	gm "GameSite/internal/Game"
	"log"

	"github.com/gin-gonic/gin"
)

/* {
    "Name":"Нож-бабочка",
    "Desc":"Острый",
    "Count":1,
    "Coast":500000
} */

func handleFunc() *gin.Engine {
	router := gin.Default()
	router.GET("/", gm.ViewIndex)
	router.POST("/", gm.TestFunc)
	router.POST("/:name/PayItem", func(ctx *gin.Context) {
		item := gm.PayItem(ctx)
		ctx.JSON(200,gin.H{"Product": item.Item})
		ctx.JSON(200,gin.H{"Product": item})
	})

	router.POST("/1", func(ctx *gin.Context) {
		data := gm.CreateGame(ctx)
		ctx.JSON(200,gin.H{"data": data})
	})

	router.POST("/:name", func(ctx *gin.Context) {
		name := ctx.Param("name")
		games,err := gm.PostGameId(ctx, name)
		if err != nil {
			ctx.JSON(404, gin.H{"error": "Неверный навзвание игры"})
		}
		ctx.JSON(200, gin.H{"success": games})
	})
	return router
}

func main() {
	err := db.InitDatabase()
	if err != nil {
		log.Fatal(err)
	}
	r := handleFunc()
	r.Run("localhost:3001")
}
