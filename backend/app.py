import time
import random
import threading
from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import psutil
# from threading import Thread

app = Flask(__name__)
# 允許所有來源的 CORS，在開發中很方便
CORS(app) 

socketio = SocketIO(app, cors_allowed_origins='http://localhost:5173', async_mode='threading')

# 用於控制背景執行緒的變數
thread = None
thread_lock = threading.Lock()

def background_data_generator():
    print("開始傳送真實系統數據...")
    while True:
        # cpu使用率
        cpu_usage = psutil.cpu_percent(interval=None)
        # 記憶體使用率
        memory_usage = psutil.virtual_memory().percent
        # cpu_usage = round(random.uniform(10.0,80.0), 2)
        # memory_usage = round(random.uniform(30.0,90.0), 2)
        
        # 準備要發送的數據
        data = { 'cpu': cpu_usage, 'memory': memory_usage }

        # 使用 socketio.emit 來發送事件給所有客戶端
        # 'update_data' 是事件名稱，前端會監聽這個事件
        socketio.emit('update_data', data)
        print(f"真實數據已發送: {data}")

        # 等待 5 秒
        time.sleep(5)

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