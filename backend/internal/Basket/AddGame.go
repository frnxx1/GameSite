package GameSite

import (
	db "GameSite/internal/DB"
	md "GameSite/internal/model"
	"context"
	"strconv"
	"time"

	"github.com/dimuska139/rawg-sdk-go/v3"
	"github.com/sirupsen/logrus"
)

func AddGame(id string, client *rawg.Client) error {
	var gameInfo md.Games

	gameId, err := strconv.Atoi(id)
	if err != nil {
		logrus.Errorf("couldn't to translate id, err: %s", err)
		return err
	}
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(time.Second*10))
	defer cancel()

	desc, err := client.GetGame(ctx, gameId)
	if err != nil {
		logrus.Errorf("couldn't to find games, err: %s", err)
		return err
	}

	gameInfo = md.Games{
		Id:          desc.ID,
		Name:        desc.Name,
		Description: desc.Description,
		Image:       desc.ImageBackground,
	}
	res := db.GlobalDB.Find(&gameInfo, "id = ?", gameId)
	if res.RowsAffected == 0 {
		db.GlobalDB.Create(&gameInfo)
		if res.RowsAffected == 0 {
			logrus.Errorf("couldn't to add game, err: %s", err)
			return res.Error
		}
	}

	return nil
}
