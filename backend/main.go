package main

import (
	"log"

	"example.com/go-backend/db"
	"example.com/go-backend/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize the database
	db.InitDB()

	// Create a new Gin router
	r := gin.Default()

	// Enable CORS for all origins
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"}, // Allow all origins
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type", "Accept", "Authorization"},
	}))

	// Register routes
	routes.RegisterRoutes(r)

	// Start the server
	log.Println("Server is running on http://localhost:8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
