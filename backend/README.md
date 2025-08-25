# CPU and Memory Monitoring Backend
This is the backend server for the CPU and Memory Monitoring application.
It uses Flask and SocketIO to provide real-time data to the frontend.

## Data Format
The update_data event sends a JSON object with the following format:

```JSON
{
  "cpu": {
    "usage": 0.5
  },
  "memory": {
    "usage": 0.8
  }
}
```