package main

import (
	db "GameSite/internal/DB"
	gm "GameSite/internal/Game"
	/* md "GameSite/internal/model" */
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

	r.GET("/:page",func(ctx *gin.Context) {
		data := gm.TestFunc(ctx.Param("page"))
		ctx.JSON(200,data)
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
		public := api.Group("/public")
		{
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
