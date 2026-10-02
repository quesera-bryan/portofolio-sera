package database

import (
	"log"
	"os"

	"github.com/sera/portfolio-backend/internal/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	var err error
	DB, err = gorm.Open(sqlite.Open("portfolio.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database")
	}

	err = DB.AutoMigrate(&models.Project{}, &models.ProjectImage{})
	if err != nil {
		log.Fatal("Failed to migrate database")
	}

	// Ensure upload directory exists
	if err := os.MkdirAll("uploads/projects", 0755); err != nil {
		log.Fatal("Failed to create uploads directory")
	}
}
