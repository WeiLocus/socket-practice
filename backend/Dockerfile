# 使用官方的 Python 映像檔
FROM python:3.10-slim

#設定工作目錄
WORKDIR /app

# 複製 requirements.txt 並安裝依賴
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 複製應用程式程式碼
COPY . .

# 使用 gunicorn 啟動應用
CMD ["gunicorn", "-k", "eventlet", "-w", "1", "-b", "0.0.0.0:5001", "app:app"]
