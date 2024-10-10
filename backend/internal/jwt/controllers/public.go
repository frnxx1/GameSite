package controllers

import (
	db "GameSite/internal/DB"
	"GameSite/internal/jwt/auth"
	"GameSite/internal/jwt/models"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type LoginPayload struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

/* обновленный токен на возврат */
type LoginResponse struct {
	Token        string `json:"token"`
	RefreshToken string `json:"refreshtoken"`
}

/* регистрация */
func Signup(c *gin.Context) error {
	var user models.User
	err := c.ShouldBindJSON(&user)
	if err != nil {
		logrus.Errorf("couldn't to get user data, err: %s", err)
		c.JSON(400, gin.H{
			"Error": "Invalid Inputs ",
		})
		c.Abort()
		return err
	}
	err = user.HashPassword(user.Password)
	if err != nil {
		logrus.Errorf("couldn't to hash password, err: %s", err)
		c.JSON(500, gin.H{
			"Error": "Error Hashing Password",
		})
		c.Abort()
		return err
	}
	err = user.CreateUserRecord()
	if err != nil {
		logrus.Errorf("couldn't to create user data, err: %s", err)
		c.JSON(500, gin.H{
			"Error": "Error Creating User ",
		})
		c.Abort()
		return err
	}
	c.JSON(200, gin.H{
		"Message": "Sucessfully Register",
	})
	return nil
}

/* вход  */
func Login(c *gin.Context) {
	var payload LoginPayload
	var user models.User
	err := c.ShouldBindJSON(&payload)
	if err != nil {
		logrus.Errorf("couldn't to get user data, err: %s", err)
		c.JSON(400, gin.H{
			"Error": "Invalid Inputs",
		})
		c.Abort()
		return
	}
	result := db.GlobalDB.Where("email = ?", payload.Email).First(&user)
	if result.Error == gorm.ErrRecordNotFound {
		logrus.Errorf("couldn't to find user data by email, err: %s", err)
		c.JSON(401, gin.H{
			"Error": "Invalid User Credentials",
		})
		c.Abort()
		return
	}
	err = user.CheckPassword(payload.Password)
	if err != nil {
		logrus.Errorf("couldn't to check password, err: %s", err)
		c.JSON(401, gin.H{
			"Error": "Invalid User Credentials",
		})
		c.Abort()
		return
	}
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
	signedtoken, err := jwtWrapper.RefreshToken(user.Email)
	if err != nil {
		logrus.Errorf("couldn't to generate refresh token, err: %s", err)
		c.JSON(500, gin.H{
			"Error": "Error Signing Token",
		})
		c.Abort()
		return
	}
	tokenResponse := LoginResponse{
		Token:        signedToken,
		RefreshToken: signedtoken,
	}

	c.SetCookie(
		"refresh_token",
		signedtoken,
		60*60*24*30,
		"/",
		"localhost",
		false,
		true,
	)
	c.SetCookie(
		"access_token",
		signedToken,
		60,
		"/",
		"localhost",
		false,
		true,
	)

	c.JSON(200, gin.H{
		"Token": tokenResponse,
	})
}
