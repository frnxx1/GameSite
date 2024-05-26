package main

import (
	db "GameSite/internal/DB"
	gm "GameSite/internal/Game"
	md "GameSite/internal/model"
	"GameSite/internal/jwt/controllers"
	"GameSite/internal/jwt/middleware"
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
	r := gin.Default()
	r.GET("/", func(ctx *gin.Context) {
		data := md.Games{
			Name:        "123",
			Description: "123",
			Image:       "123",
		}
		
		ctx.JSON(200, data)
	})
	
	r.POST("/:name/PayItem", func(ctx *gin.Context) {
		item := gm.PayItem(ctx)
		ctx.JSON(200, gin.H{"Product": item})
	})

	r.POST("/1", func(ctx *gin.Context) {
		data := gm.CreateGame(ctx)
		ctx.JSON(200, gin.H{"data": data})
	})

	r.POST("/:name", func(ctx *gin.Context) {
		name := ctx.Param("name")
		games, err := gm.PostGameId(ctx, name)
		if err != nil {
			ctx.JSON(404, gin.H{"error": "Неверный навзвание игры"})
		}
		ctx.JSON(200, gin.H{"success": games})
	})

	api := r.Group("/api")
	{
		// Create a new group for the public routes
		public := api.Group("/public")
		{
			// Add the login route
			public.POST("/login", controllers.Login)
			// Add the signup route
			public.POST("/signup", func(ctx *gin.Context) {
				err := controllers.Signup(ctx)
				if err != nil {
					ctx.JSON(200, gin.H{
						"Message": "Sucessfully Register",
					})
				}
			})
		}
		// Add the signup route
		protected := api.Group("/protected").Use(middleware.AuthZ())
		{
			// Add the profile route
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
