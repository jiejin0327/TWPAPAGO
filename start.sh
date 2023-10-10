#!/bin/bash

# 獲取當前腳本的目錄
DIR="$(dirname "$0")"


# 執行 連接資料庫 程式碼
node "$DIR/TAIWANpapago/mysql/importData.js"
node "$DIR/TAIWANpapago/node.js/read_database.js"