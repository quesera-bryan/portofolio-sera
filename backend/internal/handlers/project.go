package handlers

import (
	"fmt"
	"net/http"
	"path/filepath"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sera/portfolio-backend/internal/database"
	"github.com/sera/portfolio-backend/internal/models"
)

const defaultAspectRatio = "9:16"

func normalizeAspectRatio(value string) string {
	switch value {
	case "9:16", "16:9", "1:1", "4:5", "3:4", "21:9", "custom":
		return value
	default:
		return defaultAspectRatio
	}
}

// ─── PUBLIC ──────────────────────────────────────────────────────────────────

func GetProjects(c *gin.Context) {
	var projects []models.Project
	database.DB.Where("is_published = ?", true).Order("`order` asc, created_at desc").Find(&projects)
	for i := range projects {
		projects[i].AspectRatio = normalizeAspectRatio(projects[i].AspectRatio)
	}
	c.JSON(http.StatusOK, projects)
}

func GetProjectBySlug(c *gin.Context) {
	slug := c.Param("slug")
	var project models.Project
	if err := database.DB.Where("slug = ? AND is_published = ?", slug, true).First(&project).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}
	var images []models.ProjectImage
	database.DB.Where("project_id = ?", project.ID).Order("sort_order asc").Find(&images)
	c.JSON(http.StatusOK, gin.H{"project": project, "images": images})
}

// ─── ADMIN ────────────────────────────────────────────────────────────────────

func AdminGetProjectStats(c *gin.Context) {
	var total, published, draft, featured int64
	database.DB.Model(&models.Project{}).Count(&total)
	database.DB.Model(&models.Project{}).Where("is_published = ?", true).Count(&published)
	database.DB.Model(&models.Project{}).Where("is_published = ?", false).Count(&draft)
	database.DB.Model(&models.Project{}).Where("is_featured = ?", true).Count(&featured)
	c.JSON(http.StatusOK, gin.H{
		"total":     total,
		"published": published,
		"draft":     draft,
		"featured":  featured,
	})
}

func AdminGetProjects(c *gin.Context) {
	var projects []models.Project
	q := database.DB.Order("`order` asc, created_at desc")

	if search := c.Query("search"); search != "" {
		like := "%" + strings.ToLower(search) + "%"
		q = q.Where("LOWER(title) LIKE ? OR LOWER(category) LIKE ?", like, like)
	}
	if cat := c.Query("category"); cat != "" {
		q = q.Where("category = ?", cat)
	}
	if status := c.Query("status"); status == "published" {
		q = q.Where("is_published = ?", true)
	} else if status == "draft" {
		q = q.Where("is_published = ?", false)
	}

	q.Find(&projects)
	c.JSON(http.StatusOK, projects)
}

func AdminGetProject(c *gin.Context) {
	id := c.Param("id")
	var project models.Project
	if err := database.DB.First(&project, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}
	var images []models.ProjectImage
	database.DB.Where("project_id = ?", project.ID).Order("sort_order asc").Find(&images)
	c.JSON(http.StatusOK, gin.H{"project": project, "images": images})
}

func CreateProject(c *gin.Context) {
	var project models.Project
	if err := c.ShouldBindJSON(&project); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	project.AspectRatio = normalizeAspectRatio(project.AspectRatio)
	if err := database.DB.Create(&project).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, project)
}

func UpdateProject(c *gin.Context) {
	id := c.Param("id")
	var project models.Project
	if err := database.DB.First(&project, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}
	var input models.Project
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	input.AspectRatio = normalizeAspectRatio(input.AspectRatio)
	input.ID = project.ID
	input.CreatedAt = project.CreatedAt
	database.DB.Save(&input)
	c.JSON(http.StatusOK, input)
}

func DeleteProject(c *gin.Context) {
	id := c.Param("id")
	var project models.Project
	if err := database.DB.First(&project, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}
	database.DB.Where("project_id = ?", project.ID).Delete(&models.ProjectImage{})
	database.DB.Delete(&project)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successfully"})
}

func UpdateProjectStatus(c *gin.Context) {
	id := c.Param("id")
	var input struct {
		IsPublished *bool `json:"isPublished"`
		IsFeatured  *bool `json:"isFeatured"`
		Order       *int  `json:"order"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var project models.Project
	if err := database.DB.First(&project, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}
	updates := make(map[string]interface{})
	if input.IsPublished != nil {
		updates["is_published"] = *input.IsPublished
	}
	if input.IsFeatured != nil {
		updates["is_featured"] = *input.IsFeatured
	}
	if input.Order != nil {
		updates["order"] = *input.Order
	}
	database.DB.Model(&project).Updates(updates)
	database.DB.First(&project, project.ID)
	c.JSON(http.StatusOK, project)
}

func UploadFile(c *gin.Context) {
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No file provided"})
		return
	}

	ext := strings.ToLower(filepath.Ext(file.Filename))
	allowed := map[string]bool{".jpg": true, ".jpeg": true, ".png": true, ".gif": true, ".webp": true, ".mp4": true, ".mov": true, ".webm": true}
	if !allowed[ext] {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File type not allowed"})
		return
	}

	if file.Size > 50*1024*1024 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File too large (max 50MB)"})
		return
	}

	filename := fmt.Sprintf("%d_%s%s", time.Now().UnixNano(), sanitize(strings.TrimSuffix(file.Filename, ext)), ext)
	dst := filepath.Join("uploads", "projects", filename)
	if err := c.SaveUploadedFile(file, dst); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"url": "/uploads/projects/" + filename})
}

func sanitize(s string) string {
	replacer := strings.NewReplacer(" ", "_", "/", "_", "\\", "_")
	return replacer.Replace(s)
}
