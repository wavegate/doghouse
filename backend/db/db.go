package db

import (
	"log"

	"example.com/go-backend/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

// InitDB initializes the SQLite database and migrates the schema
func InitDB() {
	var err error
	DB, err = gorm.Open(sqlite.Open("doghouses.db"), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to SQLite database: %v", err)
	}

	// Auto-migrate the Doghouse schema
	err = DB.AutoMigrate(&models.Doghouse{})
	if err != nil {
		log.Fatalf("Failed to migrate database schema: %v", err)
	}
}
