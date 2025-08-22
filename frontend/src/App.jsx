import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

function App() {
  const [data, setData] = useState({ cpu: 0, memory: 0 });
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
      setData(message);
    });

    // 組件卸載時的清理函式
    return () => {
      console.log("正在斷開 socket 連接...");
      socket.disconnect();
    };
  }, []);

  // return (
  //   <div>
  //     <h1>即時伺服器監控</h1>
  //     <div>連線狀態
  //       <span>{isConnected ? '已連接' : '未連接'}</span>
  //     </div>
  //     <div>
  //       <h2>CPU 使用率</h2>
  //       <p>{data.cpu.toFixed(2)} %</p>
  //     </div>
  //     <div>
  //       <h2>記憶體佔用率</h2>
  //       <p>{data.memory.toFixed(2)} %</p>
  //     </div>
  //   </div>
  // )
  return (
    <div className="App">
      <header className="App-header">
        <h1>即時伺服器監控</h1>
        <div className="status">
          連線狀態:
          <span className={isConnected ? "connected" : "disconnected"}>
            {isConnected ? " 已連線" : " 已斷線"}
          </span>
        </div>
        <div className="dashboard">
          <div className="metric">
            <h2>CPU 使用率</h2>
            <p className="data">{data.cpu.toFixed(2)} %</p>
          </div>
          <div className="metric">
            <h2>記憶體佔用率</h2>
            <p className="data">{data.memory.toFixed(2)} %</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
