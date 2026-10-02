package models

import "time"

type Project struct {
	ID           uint      `gorm:"primaryKey" json:"id"`
	Title        string    `json:"title"`
	Slug         string    `gorm:"uniqueIndex" json:"slug"`
	Description  string    `json:"description"`
	Category     string    `json:"category"`
	AspectRatio  string    `gorm:"size:10;default:9:16" json:"aspect_ratio"`
	Client       string    `json:"client"`
	Year         string    `json:"year"`
	Thumbnail    string    `json:"thumbnail"`
	VideoURL     string    `json:"videoUrl"`
	YoutubeURL   string    `json:"youtubeUrl"`
	InstagramURL string    `json:"instagramUrl"`
	TiktokURL    string    `json:"tiktokUrl"`
	Roles        string    `json:"roles"`
	Tools        string    `json:"tools"`
	Duration     string    `json:"duration"`
	ProjectType  string    `json:"projectType"`
	IsFeatured   bool      `json:"isFeatured"`
	IsPublished  bool      `json:"isPublished"`
	Order        int       `json:"order"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
}

type ProjectImage struct {
	ID        uint   `gorm:"primaryKey" json:"id"`
	ProjectID uint   `json:"projectId"`
	ImageURL  string `json:"imageUrl"`
	SortOrder int    `json:"sortOrder"`
}
