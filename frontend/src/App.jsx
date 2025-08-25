import { useState, useEffect } from "react";
import io from "socket.io-client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // 建立 socket 連線
    const socket = io("http://localhost:5001");

    // 監聽 'connect' 事件
    socket.on("connect", () => {
      console.log("成功連接到 WebSocket 伺服器！");
      setIsConnected(true);
    });

    // 監聽 'disconnect' 事件
    socket.on("disconnect", () => {
      console.log("與 WebSocket 伺服器斷開連接");
      setIsConnected(false);
    });

    // 監聽後端發送的 'update_data' 事件
    socket.on("update_data", (message) => {
      console.log("接收到新數據:", message);
      setData((prev) => {
        const timestamp = new Date().toLocaleTimeString();
        const newEntry = { ...message, time: timestamp};
        const newData = [...prev, newEntry];
        // 只保留最近 10 筆數據
        return newData.slice(-9);
      })
    })

    // 組件卸載時的清理函式
    return () => {
      console.log("正在斷開 socket 連接...");
      socket.disconnect();
    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>即時CPU與記憶體監控</h1>
        <div className="status">
          連線狀態:
          <span className={isConnected ? "connected" : "disconnected"}>
            {isConnected ? " 已連線 (每5秒更新)" : " 已斷線"}
          </span>
        </div>
        {data.length > 0 ? (
          <>
            <div className="dashboard">
              <div>
                <div className="metric">
                  <div>CPU 使用率</div>
                  <p className="data">{data[data.length-1].cpu} %</p>
                </div>
                <div className="metric">
                  <div>記憶體佔用率</div>
                  <p className="data">{data[data.length-1].memory} %</p>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 400 }}>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU %" />
                    <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="Memory %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
        </>) : (
          <p>等待數據中...</p>
        )}
      </header>
    </div>
  );
}

export default App;
