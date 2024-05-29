package GameSite

import (
	"fmt"
	"log"
	md "GameSite/internal/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

)

type User struct {
	gorm.Model
	ID       int `gorm:"primaryKey"`
	Name     string 
	Email    string `json:"email" binding:"required" gorm:"unique"`
	Password string `json:"password" binding:"required"`
}

var GlobalDB *gorm.DB

/* Функция для подключения базы данных  */
func InitDatabase() (err error) {
	localhost := "localhost"
	db := "db"
	user := "user"
	pass := "pass"
	dsn := fmt.Sprintf("host=%s  user=%s dbname=%s password=%s sslmode=disable",
		localhost,
		user,
		db,
		pass,
	)
	GlobalDB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return err
	}
	err = GlobalDB.AutoMigrate(&md.Games{},&User{})
	if err != nil {
		log.Fatal("Error connecting to the database...", err)
	}
	fmt.Println("Database connection successful...")
	return
}
