package main

import (
	db "GameSite/internal/DB"
	gm "GameSite/internal/Game"
	"net/http"

	/* md "GameSite/internal/model" */
	"GameSite/internal/jwt/controllers"
	"GameSite/internal/jwt/middleware"
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
		game,err := gm.GamePage(ctx.Param("id"),client)
		if err != nil {
			ctx.JSON(400,err)
		}
		ctx.JSON(200,game)
	})

	r.GET("/", func(ctx *gin.Context) {
		page := ctx.DefaultQuery("page", "1")
		perPage := ctx.DefaultQuery("perPage", "20")
		data,err := gm.MainPage(page, perPage, client)
		if err != nil {
			ctx.JSON(400,err)
		}
		ctx.JSON(200, data)
	})

	r.POST("/PayItem/1/:name", func(ctx *gin.Context) {
		item := gm.PayItem(ctx)
		ctx.JSON(200, gin.H{"Product": item})
	})

	r.POST("/1", func(ctx *gin.Context) {
		data := gm.CreateGame(ctx)
		ctx.JSON(200, gin.H{"data": data})
	})

	r.POST("/1/:name", func(ctx *gin.Context) {
		name := ctx.Param("name")
		games, err := gm.PostGameId(ctx, name)
		if err != nil {
			ctx.JSON(404, gin.H{"error": "Неверный навзвание игры"})
		}
		ctx.JSON(200, gin.H{"success": games})
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
