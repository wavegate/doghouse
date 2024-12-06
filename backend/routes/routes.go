package routes

import (
	"example.com/go-backend/handlers"

	"github.com/gin-gonic/gin"
)

// RegisterRoutes registers all the routes for the application
func RegisterRoutes(r *gin.Engine) {
	// Doghouse routes
	r.POST("/doghouses", handlers.CreateDoghouse)
	r.GET("/doghouses/:name", handlers.GetDoghouse)
}
