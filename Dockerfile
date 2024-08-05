# Use an official Nginx image to serve static files
FROM nginx:alpine

# Copy the contents of the project to the Nginx directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Default command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
