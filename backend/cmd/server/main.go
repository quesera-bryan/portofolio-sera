package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/sera/portfolio-backend/internal/database"
	"github.com/sera/portfolio-backend/internal/handlers"
	"github.com/sera/portfolio-backend/internal/middleware"
)

func main() {
	database.ConnectDB()

	r := gin.Default()

	// Serve uploaded files statically
	r.Static("/uploads", "./uploads")

	// CORS Middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	api := r.Group("/api")
	{
		api.POST("/auth/login", handlers.Login)
		api.GET("/projects", handlers.GetProjects)
		api.GET("/projects/:slug", handlers.GetProjectBySlug)

		admin := api.Group("/admin")
		admin.Use(middleware.AuthMiddleware())
		{
			admin.GET("/stats", handlers.AdminGetProjectStats)
			admin.GET("/projects", handlers.AdminGetProjects)
			admin.GET("/projects/:id", handlers.AdminGetProject)
			admin.POST("/projects", handlers.CreateProject)
			admin.PUT("/projects/:id", handlers.UpdateProject)
			admin.PATCH("/projects/:id", handlers.UpdateProjectStatus)
			admin.DELETE("/projects/:id", handlers.DeleteProject)
			admin.POST("/upload", handlers.UploadFile)
		}
	}

	if err := r.Run(":8080"); err != nil {
		log.Fatal("Server failed to start")
	}
}
