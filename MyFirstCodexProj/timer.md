請幫我做一個網頁。
檔名：timer.html
主題：碼表。
風格：蘋果風。
wireframe：@碼表線框圖.png
操作流程：
graph TD

A[進入首頁] --> Start[點擊開始按鈕]
A[進入首頁] -- 重置按鈕預設 disabled --> ResetDisabled[無法點擊重置按鈕]

Start --> Clock[開始計時]

Clock -- 「開始」變成「暫停」 --> ClickPause[點擊暫停按鈕] --> Pause(暫停) -- 「暫停」變成「開始」 --> Start[點擊開始按鈕]

Clock -- 重置按鈕變成 enabled --> ClickReset[點擊重置按鈕] --> Reset(停止並歸零) -- 重置按鈕變成 disabled --> ResetDisabled
