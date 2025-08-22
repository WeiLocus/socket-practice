import time
import random
import threading
from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS
# from threading import Thread

app = Flask(__name__)
# 允許所有來源的 CORS，在開發中很方便
CORS(app) 

socketio = SocketIO(app, cors_allowed_origins='http://localhost:5173', async_mode='threading')

# 用於控制背景執行緒的變數
thread = None
thread_lock = threading.Lock()

def background_data_generator():
    """
    一個在背景執行的函式，
    模擬每秒產生新的伺服器數據並廣播。
    """
    print("開始產生背景數據...")
    while True:
        cpu_usage = round(random.uniform(10.0,80.0), 2)
        memory_usage = round(random.uniform(30.0,90.0), 2)
        
        # 準備要發送的數據
        data = { 'cpu': cpu_usage, 'memory': memory_usage }

        # 使用 socketio.emit 來發送事件給所有客戶端
        # 'update_data' 是事件名稱，前端會監聽這個事件
        socketio.emit('update_data', data)
        print(f"數據已發送: {data}")

        # 等待 10 秒
        time.sleep(60)

@socketio.on('connect')
def handle_connect():
    """
    當客戶端連接時觸發。
    """
    global thread
    with thread_lock:
        if thread is None or not thread.is_alive():
            # 如果背景執行緒還沒啟動，就啟動它
            thread = socketio.start_background_task(background_data_generator)
    print('一個客戶端已連接')

@app.route('/')
def index():
    """
    根目錄路由，返回一個簡單的訊息。
    """
    return "<h1>WebSocket Server is running!</h1>"

# if __name__ == '__main__':
#     # 使用 Flask-SocketIO 內建的 threading 模式運行
#     socketio.run(app, host="0.0.0.0", port=5001, debug=True, allow_unsafe_werkzeug=True)