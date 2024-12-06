package models

// Doghouse represents the database model for a doghouse
type Doghouse struct {
	ID   uint   `gorm:"primaryKey"`
	Name string `gorm:"unique"`
}
