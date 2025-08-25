# CPU and Memory Monitoring Project
This project provides a real-time CPU and memory monitoring system using Docker, Flask, SocketIO, and React.

## Overview
The project consists of two main components:

Backend: A Flask-based server that provides real-time CPU and memory usage data using SocketIO.
Frontend: A React-based client that displays the real-time data from the backend server.


## System Requirements

| Component | Version | Query Command | Description |
|-----------|---------|-------------|-------------
| Ubuntu | 24.04.2 LTS | `lsb_release -a` | Operating System |
| Docker | 28.2.2 | `docker version` | Containerization Platform |
| Node.js | 22.16.0 | `node -v` | |

## How to use

### Start the services
The project uses Docker Compose to manage the containers for the backend and frontend. To start the project, 

First run or after code changes:
```
docker compose up -d --build
```
This will start both the backend and frontend containers in detached mode.

### Stop the services

```
docker compose down
```