# 使用官方 Node.js 長期支援版本為基礎映像
FROM node:14

# 使用 /app 作為容器內的工作目錄。
WORKDIR /usr/src/app

# 複製 package.json 和 package-lock.json 到容器中
COPY package*.json ./

# 安裝你的專案依賴
RUN npm install

# 將 TAIWANpapago 目錄下的所有內容複製到容器的 /app 目錄中
COPY TAIWANpapago/. /usr/src/app/

# 開放你的應用所使用的端口
EXPOSE 3000

# 複製啟動腳本到容器
COPY start.sh ./start.sh

# 設定啟動命令
CMD ["./start.sh"]

