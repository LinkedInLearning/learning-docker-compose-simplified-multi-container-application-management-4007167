# Build Arguments Demo

Demonstrates how to pass build arguments to Docker containers using Docker Compose.

## Quick Start

```bash
docker compose up --build
```

Open [this link](http://localhost:8080) to see your customized page.

## Customize Build Arguments

### Using Environment Variables (PowerShell)

```powershell
$env:APP_TITLE="My Custom App"
$env:MESSAGE="Hello from PowerShell!"
$env:COLOR="green"
docker-compose up --build
```

## Build Arguments

- `APP_TITLE` - Page title (default: "Build Arguments Demo")
- `MESSAGE` - Custom message (default: "Learn Docker Compose Build Args!")
- `COLOR` - Background color (default: "darkblue")

## What This Demonstrates

- Defining build arguments in compose.yml
- Passing values from environment variables
- Using build arguments in Dockerfile
- Build-time vs runtime configuration
