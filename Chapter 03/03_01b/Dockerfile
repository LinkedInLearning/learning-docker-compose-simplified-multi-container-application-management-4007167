FROM nginx:alpine

# Build arguments
ARG APP_TITLE="Default Title"
ARG MESSAGE="Default Message"  
ARG COLOR="gray"

# Create simple HTML page
RUN echo '<!DOCTYPE html>' > /usr/share/nginx/html/index.html && \
    echo '<html><head><title>'${APP_TITLE}'</title>' >> /usr/share/nginx/html/index.html && \
    echo '<style>body{font-family:Arial;text-align:center;padding:50px;background:'${COLOR}';color:white}</style>' >> /usr/share/nginx/html/index.html && \
    echo '</head><body>' >> /usr/share/nginx/html/index.html && \
    echo '<h1>'${APP_TITLE}'</h1>' >> /usr/share/nginx/html/index.html && \
    echo '<p>'${MESSAGE}'</p>' >> /usr/share/nginx/html/index.html && \
    echo '<p>This page was built with Docker Compose build arguments!</p>' >> /usr/share/nginx/html/index.html && \
    echo '</body></html>' >> /usr/share/nginx/html/index.html

EXPOSE 80
