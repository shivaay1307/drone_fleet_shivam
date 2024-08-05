# Drone Fleet Management

This project is a simple web-based application for managing a fleet of drones. The application is built using HTML, CSS, and JavaScript, and is containerized using Docker.

## Project Structure

drone_fleet_shivam/
├── assets/
│ ├── images/
│ │ └── (image files)
│ ├── css/
│ │ └── custom.css
│ ├── bootstrap/
│ ├── css/
│ │ └── (Bootstrap CSS files)
│ ├── js/
│ └── (Bootstrap JS files)
├── config.json
├── dashboard.html
├── index.html
├── Dockerfile
├── docker-compose.yml
├── README.md


## Files and Directories

- **assets/**: Contains images and CSS files.
- **config.json**: Contains the configuration data for drones and users.
- **dashboard.html**: The dashboard page displaying drone information and maintenance logs.
- **index.html**: The main page with login functionality.
- **Dockerfile**: The Dockerfile for building the Docker image.
- **docker-compose.yml**: The Docker Compose file for setting up the application.
- **README.md**: This README file.

## Installation and Setup

### Prerequisites

- Docker
- Docker Compose

### Steps

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/drone_fleet_shivam.git
cd drone_fleet_shivam

sudo docker-compose up --build