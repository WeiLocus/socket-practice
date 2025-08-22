# STAGE 1: Build
# 使用 Node.js Alpine 映像檔來建置 React App
# FROM node-19-alpine AS builder

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

FROM node:22.12

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]



