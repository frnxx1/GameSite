package GameSite

import (
	"context"
	"strconv"
	"time"

	"github.com/dimuska139/rawg-sdk-go/v3"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

func SearchGenre(client *rawg.Client, genre, num, perNum string) ([]gin.H, error) {
	page, err := strconv.Atoi(num)
	if err != nil {
		logrus.Errorf("failed translate num, err: %s", err)
		return nil, err
	}
	perPage, err := strconv.Atoi(perNum)
	if err != nil {
		logrus.Errorf("failed translate perNum, err: %s", err)
		return nil, err
	}

	filter := rawg.NewGamesFilter().
		SetGenres(genre).
		SetPage(page).
		SetPageSize(perPage)

	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(time.Second*500))
	defer cancel()
	game, _, err := client.GetGames(ctx, filter)
	if err != nil {
		logrus.Errorf("couldn't find games, err: %s", err)
		return nil, err
	}

	var results []gin.H
	for _, i := range game {
		result := gin.H{
			"id":     i.ID,
			"name":   i.Name,
			"genre":  i.Genres,
			"image":  i.ImageBackground,
			"rating": i.Rating,
		}
		results = append(results, result)
	}

	return results, nil
}
