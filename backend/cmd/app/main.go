package main

import (
	db "GameSite/internal/DB"
	gm "GameSite/internal/Game"
	"io"
	"net/http"

	"GameSite/internal/jwt/controllers"
	"GameSite/internal/jwt/middleware"
	sr "GameSite/internal/searchGame"
	"log"

	"github.com/dimuska139/rawg-sdk-go/v3"
	"github.com/gin-gonic/gin"
)

/* {
    "Name":"Нож-бабочка",
    "Desc":"Острый",
    "Count":1,
    "Coast":500000
} */

func handleFunc() *gin.Engine {
	r := gin.Default()
	config := rawg.Config{
		ApiKey:   "1e5f1a0a5590404f950a65bcdeeb19d4",
		Language: "ru",
		Rps:      5,
	}
	client := rawg.NewClient(http.DefaultClient, &config)
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	r.GET("/:id", func(ctx *gin.Context) {
		game, err := gm.GamePage(ctx.Param("id"), client)
		if err != nil {
			ctx.JSON(400, err)
		}
		ctx.JSON(200, game)
	})

	r.POST("/game/search", func(ctx *gin.Context) {
		text, err := io.ReadAll(ctx.Request.Body)
		if err != nil {
			ctx.JSON(400, err)
		}
		res, err := sr.SearchGame(client,string(text))
		if err != nil {
			ctx.JSON(400, err)
		}
		ctx.JSON(200, gin.H{"game":res,"len":len(res)})
	})

	r.GET("/", func(ctx *gin.Context) {
		data, err := gm.MainPage(ctx.DefaultQuery("page", "1"),ctx.DefaultQuery("perPage", "20"), client)
		if err != nil {
			ctx.JSON(400, err)
		}
		ctx.JSON(200, gin.H{"game":data,"len":len(data)})
	})
	r.GET("/genre/:genre",func(ctx *gin.Context) {
		result,err := gm.SearchGenre(client,ctx.Param("genre"),ctx.DefaultQuery("page", "1"),ctx.DefaultQuery("perPage", "20"))
		if err != nil {
			ctx.JSON(400, err)
		}
		ctx.JSON(200, result)
	})


	api := r.Group("/api")
	{
		public := api.Group("/public")
		{

			public.POST("/login", controllers.Login)
			public.POST("/signup", func(ctx *gin.Context) {
				err := controllers.Signup(ctx)
				if err != nil {
					ctx.JSON(200, gin.H{
						"Message": "Sucessfully Register",
					})
				}
			})
		}
		protected := api.Group("/protected").Use(middleware.AuthZ())
		{

			protected.GET("/profile", controllers.Profile)
		}
	}

	return r
}

func main() {
	err := db.InitDatabase()
	if err != nil {
		log.Fatal(err)
	}
	r := handleFunc()
	r.Run(":3001")
}
