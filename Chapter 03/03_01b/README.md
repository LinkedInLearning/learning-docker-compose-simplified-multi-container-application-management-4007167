# Simple Build Arguments Demo

A simple example showing how to pass build arguments to Docker containers using Docker Compose.

## How to Use

### Method 1: Default values

```bash
docker compose up --build
```

### Method 2: Custom values via environment variables

```powershell
# Windows PowerShell
$env:APP_TITLE="My App"
$env:MESSAGE="Custom message!"
$env:COLOR="green"
docker compose up --build
```

## Available Build Arguments

- `APP_TITLE` - The page title (default: "My Simple App")
- `MESSAGE` - Custom message to display (default: "Hello from Docker Compose!")
- `COLOR` - Background color (default: "blue")

## Access

Open [this link](http://localhost:8080) to see your customized page.

## What This Demonstrates

- How to define build arguments in compose.yml
- How to pass values from environment variables
- How build arguments are used in Dockerfile
- The difference between build-time and runtime configuration
