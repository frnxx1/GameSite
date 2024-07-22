package GameSite

import (
	"context"
	"time"

	"github.com/dimuska139/rawg-sdk-go/v3"
	"github.com/gin-gonic/gin"
)

func SearchGame(client *rawg.Client,text string) ([]gin.H, error) {
	filter := rawg.NewGamesFilter().
		SetSearch(text)

	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(time.Second*500))
	defer cancel()
	game, _, err := client.GetGames(ctx, filter)

	if err != nil {
		return nil, err
	}
	var results []gin.H
	for _, i := range game {
		result := gin.H{
			"id":          i.ID,
			"name":        i.Name,
			"image":       i.ImageBackground,
			"rating":      i.Rating,
		}
		results = append(results, result)
	}
	return results, nil
}
