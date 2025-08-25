
# CPU and Memory Monitoring Frontend

This is the frontend client for the CPU and Memory Monitoring application. It uses React and SocketIO to display real-time data from the backend server.

## Installation
To install the dependencies, run:

```
npm install
```
to start the application, run:
```
npm run dev
```

### Configuration
The frontend is configured to connect to the backend server at http://localhost:5001. You can change this by modifying the socket.io-client URL in App.jsx.

### Features
Use recharts to visualize real-time CPU and memory usage data from the backend server.
Updates data every 5 seconds.