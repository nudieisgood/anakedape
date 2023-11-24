# 概述

此為 RWD 網頁可以在不同裝置上瀏覽操作，你可以在網站上瀏覽品牌最新資訊，預覽或購買商品。在 footer 位置有供網頁管理者進入的入口來查看顧客訂單，並管理訂單是否出貨完成，以及新增及修改商品的內容，亦可管理 features 專欄頁面的文章內容，顧客訂單確定後後端伺服器會管理資料庫中商品的數量等。

# 功能

#### 登入登出 (jwt token)

#### Footer 處有進入管理者頁面的接口，點擊會用 admin 帳號登入並轉址到管理者頁面

#### 可瀏覽商品, 專欄列表

#### 管理者可修改商品, 專欄 - 新增及修改

#### 管理者可進行訂單管理

#### localstorage 管理購物車

#### 跨頁面 / 瀏覽器 分享 checkout 商品清單 (jwt token)

#### sorting 商品功能

# 資料夾說明

### 前端

#### assets - 靜態資源

#### components - 頁面零組件

#### pages - 主要畫面組件

#### context - 上層 state 管理

#### utilities - 其他 helper function 及 靜態資料

### 伺服器端

#### controllers - 邏輯控制器

#### middlewares - 中介邏輯

#### models - 資料庫檔案結構

#### routes - 路由控制

#### server - 初始啟動伺服器邏輯

# 技術

### 前端

#### react

#### react-router-dom

#### axios

#### framer-motion

#### tailwindcss

### 伺服器

#### Node.js

#### express

#### mongoose

#### jsonwebtoken

#### validator

# 第三方服務

#### cloudinary

#### mongoDB
