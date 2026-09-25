# 📋 HKO 工時表 - 員工工時與請假管理系統

一個基於 Firebase 的員工工時記錄與請假管理系統，支援半日/全日請假、公眾假期自動標記、特別安排備註、**累計工時差值追蹤**等功能。系統現已升級為**電子郵件登入**，確保資料安全與個人化。

## Access
- 🌐 [GitHub Page](https://mcc-mak.github.io/hko-timesheet/)
- 🛢 [Firebase](https://console.firebase.google.com/u/0/project/hko-timesheet/database/hko-timesheet-default-rtdb/data)

## ✨ 主要功能

- **工時記錄**: 記錄每日四個時間點 (時間1-4)
- **請假管理**: 
  - 上午請假 / 下午請假 / 全天請假 (自動連動)
  - 勾選早上請假時自動清空時間1、2
  - 勾選下午請假時自動清空時間3、4
- **自動計算**: 
  - 預計工時 (週一至週四 07:50，週五 07:40)
  - 預計下班時間 (根據時間1 + 預計工時 + 午休時間)
  - 實際工時 (自動計算)
- **假日分類**:
  - 🟣 週末自動標記
  - 🔴 公眾假期 (從 Firebase 讀取)
  - 🟡 上午/下午請假
  - 🔴 特別安排 (含備註，不可編輯)
- **累計差值追蹤**:
  - 📊 每月自動計算「預計工時 vs 實際工時」差值
  - ✏️ 支援手動輸入「校正因子」調整月份差值
  - 📈 自動計算 2025年7月至今的累計總差值 (含校正因子)
- **資料儲存**: 
  - 需先點擊「同意並啟用儲存」獲得授權
  - 支援未儲存變更暫存
  - 即時同步 Firebase 資料 (onValue listeners)
- **🔐 郵件登入系統**:
  - 支援註冊新帳號 / 登入現有帳號
  - 每位使用者擁有獨立的 Firebase UID，資料完全隔離
  - 登入狀態持久化

## 🚀 線上使用

直接開啟 `index.html` 即可使用，首次使用需輸入 Firebase 設定。

## 🗄️ Firebase 資料結構

### Realtime Database 路徑

```
/
├── holiday/
│   └── {year}/
│       └── [日期陣列]              # 公眾假期列表
│
├── timesheet/
│   └── {userId}/
│       └── {year}/
│           └── {month}/
│               └── {day}/
│                   ├── time1: "09:00"    # 上班時間
│                   ├── time2: "12:30"    # 午休開始
│                   ├── time3: "13:30"    # 午休結束
│                   ├── time4: "18:00"    # 下班時間
│                   ├── isAmOff: true     # 上午請假
│                   ├── isPmOff: false    # 下午請假
│                   └── remark: "特別安排" # 備註 (選填)
│
└── offset/
    └── {userId}/
        └── {year}/
            └── {month}/
                ├── differenceMinutes: 120      # 該月工時差值 (分鐘)
                ├── differenceFormatted: "已加班 02:00"
                ├── rectifyingFactor: 30        # 校正因子 (分鐘)
                └── lastUpdated: "2025-07-11T..."
```

### 資料範例

```json
{
  "timesheet": {
    "userId123": {
      "2025": {
        "07": {
          "11": {
            "time1": "09:40",
            "time2": "12:40",
            "time3": "14:07",
            "time4": "19:01",
            "isAmOff": false,
            "isPmOff": false
          },
          "30": {
            "time1": null,
            "time2": null,
            "time3": null,
            "time4": null,
            "isAmOff": true,
            "isPmOff": true
          }
        }
      }
    }
  },
  "offset": {
    "userId123": {
      "2025": {
        "07": {
          "differenceMinutes": 45,
          "differenceFormatted": "已加班 00:45",
          "rectifyingFactor": 0,
          "lastUpdated": "2025-07-31T16:00:00Z"
        }
      }
    }
  },
  "holiday": {
    "2025": [
      "2025-01-01",
      "2025-01-29",
      "2025-04-04",
      "2025-05-01",
      "2025-07-01",
      "2025-10-01",
      "2025-12-25"
    ]
  }
}
```

## 🔐 Firebase 安全規則

```json
{
  "rules":{
    "offset":{
      ".read": "auth != null",
      ".write": "auth != null",
      "$userId":{
        ".read": "$userId === auth.uid",
        ".write": "$userId === auth.uid",
        "$year":{
          ".read": "$userId === auth.uid",
          ".write": "$userId === auth.uid",
          "$month":{
            ".read": "$userId === auth.uid",
            ".write": "$userId === auth.uid"
          }
        }
      }
    },
    "holiday":{
      ".read": "auth != null",
      ".write": "auth != null",
      "$holidayId":{
        ".read": "auth != null",
        ".write": "auth != null"
      }
    },
    "timesheet":{
      ".read": "auth != null",
      ".write": "auth != null",
      "$userId":{
        ".read": "$userId === auth.uid",
        ".write": "$userId === auth.uid",
        "$year":{
          ".read": "$userId === auth.uid",
          ".write": "$userId === auth.uid",
          "$month":{
            ".read": "$userId === auth.uid",
            ".write": "$userId === auth.uid",
            "$day":{
              ".read": "$userId === auth.uid",
              ".write": "$userId === auth.uid",
              ".validate":"(!newData.hasChild('time1') || newData.child('time1').isString()) && (!newData.hasChild('time2') || newData.child('time2').isString()) && (!newData.hasChild('time3') || newData.child('time3').isString()) && (!newData.hasChild('time4') || newData.child('time4').isString()) && (!newData.hasChild('isAmOff') || newData.child('isAmOff').isBoolean()) && (!newData.hasChild('isPmOff') || newData.child('isPmOff').isBoolean())"
            }
          }
        }
      }
    }
  }
}
```

**說明**: 
- 使用電子郵件/密碼驗證，每位使用者有獨立的 UID
- 能讀寫 `timesheet/{UID}/*` 及 `offset/{UID}/*` 路徑
- `holiday` 為公開讀寫 (僅管理員可修改)

## 🛠️ 技術棧

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **UI 框架**: SweetAlert2
- **後端服務**: Firebase
  - Realtime Database (資料儲存)
  - Authentication (電子郵件/密碼登入)
- **部署**: 靜態 HTML 檔案，可直接在瀏覽器執行

## 📱 使用說明

### 1. 首次使用設定

1. 開啟 `index.html`
2. 輸入 Firebase 設定：
   - API Key (必填)
   - Database URL (必填，預設: `https://hko-timesheet-default-rtdb.firebaseio.com`)
3. 點擊「連線」
4. **註冊帳號**或**登入現有帳號**

### 2. 日常使用流程

1. **登入**: 使用電子郵件和密碼登入
2. **同意授權**: 點擊「同意並啟用儲存」按鈕
3. **填寫工時**: 
   - 可編輯日期 (根據狀態顯示不同背景色)
   - 輸入時間1-4 (24小時制)
4. **請假設定**: 
   - 勾選「早上請假」→ 時間1、2自動清空並禁用
   - 勾選「下午請假」→ 時間3、4自動清空並禁用
   - 預計工時/下班時間自動計算
5. **校正因子 (選填)**:
   - 在月份表格下方可輸入「校正因子」(分鐘)
   - 正值 = 減少工時 (例如: 已加班過多，可扣減)
   - 負值 = 增加工時 (例如: 需補班)
6. **儲存**: 修改後點擊右下角「儲存」按鈕

### 3. 資料狀態標示

| 背景顏色 | 說明 | 能否編輯 |
|---------|------|---------|
| 🟢 淺綠 | 已有資料 | ✅ 可編輯 |
| 🟠 淺橘 | 缺失資料 | ✅ 可編輯 |
| 🔵 淡藍 | 週末 | ❌ 不可編輯 |
| 🔴 淡紅 | 公眾假期 | ❌ 不可編輯 |
| 🟡 淡黃 | 上午/下午請假 | ✅ 可編輯 |
| 💗 淡粉 | 特別安排 (含備註) | ❌ 不可編輯 |
| ⚪ 灰色 | 歷史日期 (早於 2025-07-11) | ❌ 不可編輯 |
| ⚪ 白色 | 未來日期 (晚於今天) | ❌ 不可編輯 |

### 4. 累計差值計算說明

```
月份差值 = Σ(預計工時 - 實際工時)  // 僅計算工作日 (排除週末/假期/全天請假)

月份總差值 = 月份差值 + 校正因子

累計總差值 = Σ(各月份總差值)  // 從 2025年7月 累積至今
```

**顯示範例**:
- 「已加班 02:30」= 累計工時比預計少 2.5 小時 (需補班)
- 「要加班 01:15」= 累計工時比預計多 1.25 小時 (已超時)

### 5. 預計下班時間計算公式

```
預計下班時間 = 時間1 + 預計工時 + (時間3 - 時間2)

其中:
- 預計工時: 
  - 週一至週四: 07:50
  - 週五: 07:40
  - 上午請假: 依剩餘時數計算 (下午: 04:20)
  - 下午請假: 依剩餘時數計算 (週五: 03:25 / 其他: 03:35)
  - 全天請假/週末/假期: 00:00
```

## 📊 功能限制

- **可編輯日期範圍**: 2025-07-11 至 今天 (UTC+8)
- **不可編輯**: 
  - 週末、公眾假期
  - 含「特別安排」備註的日期
  - 歷史日期 (早於 2025-07-11)
  - 未來日期 (晚於今天)
- **可編輯但受限制**: 
  - 上午/下午請假日期 (時間欄位會根據請假狀態自動禁用/清空)
- **需要同意**: 每次頁面載入需重新同意儲存授權

## 🔧 開發者資訊

### Firebase 專案設定

1. 建立 Firebase 專案
2. 啟用 Email/Password Authentication
3. 建立 Realtime Database
4. 複製 Firebase 設定到應用程式

### 本地開發

```bash
# 直接開啟 index.html 即可
open index.html

# 或使用簡單的 HTTP 伺服器
python -m http.server 8000
# 訪問 http://localhost:8000
```

### 環境變數

儲存在 `sessionStorage` 中，無需額外設定檔。

## 🎯 未來擴充建議

- [ ] 匯出報表功能 (CSV/Excel/PDF)
- [ ] 統計圖表 (每月工時趨勢)
- [ ] 多使用者管理介面
- [ ] 審核流程 (主管簽核)
- [ ] 郵件通知 (請假申請)
- [ ] 行動裝置優化 (PWA)

## 📝 版本記錄

- **v1.2.0** (目前版本)
  - 🔐 新增電子郵件/密碼登入系統
  - ✨ 支援註冊新帳號
  - 🔧 使用者資料完全隔離 (基於 UID)
  - 🔧 改善登入體驗與錯誤提示
  - 🔧 移除匿名登入，改用郵件驗證

- **v1.1.0** (2025-11)
  - ✨ 新增累計差值追蹤系統
  - ✨ 新增校正因子功能
  - ✨ 新增累計總差值顯示 (2025-07 至今)
  - ✨ 改善請假與時間欄位的連動邏輯
  - 🔧 新增即時 Firebase 同步 (onValue)
  - 🔧 優化未儲存變更提示

- **v1.0.0** (2025-07-11)
  - 初始版本
  - 支援工時記錄與全天請假
  - Firebase 整合
  - 公眾假期自動標記

## 📄 授權

內部使用工具 - 版權所有 © HKO

## 🔗 相關連結

- [Firebase Console](https://console.firebase.google.com/u/0/project/hko-timesheet)
  - [Realtime Database](https://console.firebase.google.com/u/0/project/hko-timesheet/database/hko-timesheet-default-rtdb/data)
  - [Security Rules](https://console.firebase.google.com/u/0/project/hko-timesheet/database/hko-timesheet-default-rtdb/rules)
  - [Authentication](https://console.firebase.google.com/u/0/project/hko-timesheet/authentication/users)
- [API Key Settings](https://console.firebase.google.com/u/0/project/hko-timesheet/settings/general)

---

## ❓ 常見問題

**Q: 為什麼無法儲存資料？**  
A: 請先點擊「同意並啟用儲存」按鈕獲得授權。

**Q: 為什麼某些日期無法編輯？**  
A: 週末、公眾假期、特別安排、歷史日期 (早於2025-07-11) 或未來日期皆不可編輯。

**Q: 如何修改已儲存的資料？**  
A: 直接在表格中修改時間或請假狀態，會出現「未儲存的修改」提示，點擊儲存即可。

**Q: 上午/下午請假的時間欄位為什麼被清空了？**  
A: 這是系統設計。勾選早上請假代表當天上午不用上班，因此時間1(上班)、時間2(午休開始)自動清空並禁用；下午請假同理。取消勾選後可重新輸入時間。

**Q: 什麼是校正因子？**  
A: 校正因子讓管理員可以手動調整月份的工時差值。例如員工某月因特殊原因需補班或減班，可透過校正因子 +/- 分鐘數來修正累計總差值。

**Q: 累計總差值如何計算？**  
A: 系統會從 2025年7月 開始，逐月加總「月份差值 + 校正因子」，並顯示在表格最下方。正值表示需補班，負值表示已超時。

**Q: 資料會遺失嗎？**  
A: 所有儲存資料都在 Firebase 雲端，除非手動刪除，否則不會遺失。

**Q: 忘記密碼怎麼辦？**  
A: 請聯絡系統管理員重置密碼。目前版本尚未支援自助重設密碼。
