package serve

import (
	"fmt"
	"github.com/aircjm/orange/web/serve/routers"
	"github.com/aircjm/orange/web/tools"
	"github.com/gin-gonic/gin"
)

func App() {
	r := gin.New()
	gin.SetMode(gin.ReleaseMode)

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	routers.Init(r)

	port := fmt.Sprintf(":%d", tools.Conf.System.Port)
	// listen and serve on 0.0.0.0:8080
	r.Run(port)
}
