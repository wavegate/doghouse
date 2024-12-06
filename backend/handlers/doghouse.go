package handlers

import (
	"net/http"

	"example.com/go-backend/db"
	"example.com/go-backend/models"

	"github.com/gin-gonic/gin"
)

// CreateDoghouse handles the creation of a new doghouse
func CreateDoghouse(c *gin.Context) {
	var doghouse models.Doghouse
	if err := c.ShouldBindJSON(&doghouse); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result := db.DB.Create(&doghouse)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusCreated, doghouse)
}

// GetDoghouse handles fetching a doghouse by its name
func GetDoghouse(c *gin.Context) {
	name := c.Param("name")
	var doghouse models.Doghouse
	result := db.DB.Where("name = ?", name).First(&doghouse)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Doghouse not found"})
		return
	}

	c.JSON(http.StatusOK, doghouse)
}
