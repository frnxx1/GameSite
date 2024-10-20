package controllers

import (
	db "GameSite/internal/DB"
	"GameSite/internal/jwt/auth"
	"GameSite/internal/jwt/models"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

/* проверка есть ли пользователь в базе */
func Profile(c *gin.Context) {

	var user models.User

	email, _ := c.Get("email")

	result := db.GlobalDB.Where("email = ?", email.(string)).First(&user)

	if result.Error == gorm.ErrRecordNotFound {
		c.JSON(404, gin.H{
			"Error": "User Not Found",
		})
		c.Abort()
		return
	}

	if result.Error != nil {
		c.JSON(500, gin.H{
			"Error": "Could Not Get User Profile",
		})
		c.Abort()
		return
	}

	user.Password = ""

	jwtWrapper := auth.JwtWrapper{
		SecretKey:         "verysecretkey",
		Issuer:            "AuthService",
		ExpirationMinutes: 1,
		ExpirationHours:   12,
	}
	signedToken, err := jwtWrapper.GenerateToken(user.Email)
	if err != nil {
		logrus.Errorf("couldn't to generate access token, err: %s", err)
		c.JSON(500, gin.H{
			"Error": "Error Signing Token",
		})
		c.Abort()
		return
	}

	
	c.JSON(200, gin.H{
		"User":  user,
        "Token": si,
	})
}
