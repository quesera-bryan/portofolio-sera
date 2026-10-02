package config

import (
	"os"
)

// JWTSecret is the HMAC signing key for JWT tokens.
// Set the JWT_SECRET environment variable in production to override the default.
var JWTSecret = func() []byte {
	if s := os.Getenv("JWT_SECRET"); s != "" {
		return []byte(s)
	}
	return []byte("my_secret_key_change_in_prod")
}()
