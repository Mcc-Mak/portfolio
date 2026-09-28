import os
import re
import datetime
import subprocess
import xml.etree.ElementTree as ET

# ---------- Telegram 設定（從環境變數讀取） ----------
TELEGRAM_TOKEN = os.environ.get("TELEGRAM_TOKEN", "")
TELEGRAM_GROUP_ID = os.environ.get("TELEGRAM_GROUP_ID", "")
TELEGRAM_TOPIC_ID = os.environ.get("TELEGRAM_TOPIC_ID", "")   # 若無主題可留空

def send_telegram_message(message):
    """透過 subprocess 呼叫 SendTelegram.py 發送訊息"""
    if not TELEGRAM_TOKEN or not TELEGRAM_GROUP_ID:
        print("⚠️ Telegram 憑證未設定，跳過通知。")
        return

    cmd = [
        "python3", "SendTelegram.py",
        f"TELEGRAM_TOKEN={TELEGRAM_TOKEN}",
        f"TELEGRAM_GROUP_ID={TELEGRAM_GROUP_ID}",
        f"TELEGRAM_TOPIC_ID={TELEGRAM_TOPIC_ID}",
        f"SEND_MESSAGE={message}"
    ]
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print("📨 Telegram 通知已發送。")
    except subprocess.CalledProcessError as e:
        print(f"❌ Telegram 發送失敗: {e.stderr.decode('utf-8', errors='ignore')}")
    except FileNotFoundError:
        print("❌ 找不到 SendTelegram.py，請確認該腳本位於當前目錄或 PATH 中。")

def handle_analysis_error(error_type, message, file_path):
    """
    錯誤處理函數：將分析中出現的問題自動寫入獨立的錯誤日誌檔。
    """
    archive_dir = os.path.dirname(file_path)
    log_file_path = os.path.join(archive_dir, "error_log.txt")
    current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    filename = os.path.basename(file_path)
    
    log_entry = (
        f"[{current_time}] [{error_type}]\n"
        f"  目標檔案: {filename}\n"
        f"  詳細訊息: {message}\n"
        f"  --------------------------------------------------\n"
    )
    try:
        send_telegram_message(
            f"錯誤類型: {error_type}\n目標檔案: {filename}\n詳細訊息: {message}"
        )
        
        with open(log_file_path, "a", encoding="utf-8") as log_file:
            log_file.write(log_entry)
        print(f"💾 錯誤已自動記錄至獨立日誌: {log_file_path}")
    except Exception as e:
        print(f"❌ 無法寫入日誌檔案: {e}")


def rotate_backups(archive_dir, base_filename):
    """
    輪替機制：將現有檔案向後推移 (.1 -> .2 -> ... -> .7)，並刪除超過 .7 的檔案。
    """
    # 1. 如果最舊的 .7 存在，先將其刪除
    oldest_file = os.path.join(archive_dir, f"{base_filename}.7")
    if os.path.exists(oldest_file):
        try:
            os.remove(oldest_file)
            print(f"♻️ 已自動清理過期備份: {os.path.basename(oldest_file)}")
        except Exception as e:
            print(f"⚠️ 無法刪除舊檔案 {oldest_file}: {e}")

    # 2. 將現有的 .1 ~ .6 依序向後重新命名 (.6 變 .7, .5 變 .6, ...)
    for i in range(6, 0, -1):
        src = os.path.join(archive_dir, f"{base_filename}.{i}")
        dst = os.path.join(archive_dir, f"{base_filename}.{i+1}")
        if os.path.exists(src):
            os.rename(src, dst)

    # 3. 將原本最外層的原始檔案重新命名為 .1
    primary_file = os.path.join(archive_dir, base_filename)
    if os.path.exists(primary_file):
        dst_1 = os.path.join(archive_dir, f"{base_filename}.1")
        os.rename(primary_file, dst_1)


def check_encoding_and_garbled(file_path):
    """
    檢查檔案是否為 UTF-8 編碼，並偵測是否含有常見的亂碼字元。
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        garbled_pattern = re.compile(r'[\ufffd\x00-\x08\x0b\x0c\x0e-\x1f]')
        if garbled_pattern.search(content):
            return True, "⚠️ 檔案可讀，但偵測到疑似亂碼符號。"
        return True, "✅ 正常"
    except UnicodeDecodeError:
        return False, "❌ 錯誤：非標準 UTF-8 編碼"
    except Exception as e:
        return False, f"❌ 無法讀取檔案: {e}"


def download_and_check_xml(url):
    """
    執行輪替、下載最新 XML 到 ./web_archive/ 並進行指標檢查。
    """
    current_dir = os.path.abspath(os.path.dirname(__file__)) if '__file__' in locals() else os.getcwd()
    archive_dir = os.path.join(current_dir, "web_archive")
    
    if not os.path.exists(archive_dir):
        os.makedirs(archive_dir)
        
    base_filename = url.split('/')[-1]  # 例如: eq_app-30d_e.xml
    absolute_path = os.path.join(archive_dir, base_filename)
    
    print(f"==================================================")
    print(f"🌐 原始請求網址: {url}")
    
    # 1. 下載前，先執行輪替作業 (將舊的檔案往後推一格)
    rotate_backups(archive_dir, base_filename)
    print(f"📂 最新檔案儲存路徑: {absolute_path}")
    
    # 2. 執行 WGET 下載最新檔案
    cmd = ["wget", "-q", "-O", absolute_path, "--no-check-certificate", url]
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    except subprocess.CalledProcessError as e:
        print(f"❌ wget 下載失敗。錯誤: {e.stderr.decode('utf-8', errors='ignore')}\n")
        return

    # 3. 檢查剛下載的最新檔案是否為空白檔
    if not os.path.exists(absolute_path) or os.path.getsize(absolute_path) == 0:
        err_msg = "下載的檔案不存在或內容為空 (空白檔)。"
        print(f"❌ {err_msg}")
        handle_analysis_error("EMPTY_FILE", err_msg, absolute_path)
        return
        
    print(f"--------------------------------------------------")
    print(f"📊 [ 檔案分析報告 - {base_filename} ]")
    
    # 指標 1：檢查 UTF-8 編碼與亂碼
    is_utf8, encoding_status = check_encoding_and_garbled(absolute_path)
    print(f"1. 編碼與亂碼檢查 : {encoding_status}")
    
    if not is_utf8 or "疑似亂碼" in encoding_status:
        handle_analysis_error("ENCODING_OR_GARBLED_ERROR", encoding_status, absolute_path)
        if not is_utf8:
            return

    # 解析 XML 結構
    try:
        tree = ET.parse(absolute_path)
        root = tree.getroot()
        events = root.findall('.//EventGroup/Event')
        
        # 指標 2：計算 Total number of <Event>
        total_events = len(events)
        print(f"2. <Event> 總筆數  : {total_events} 筆")
        
        if total_events == 0:
            err_msg = "<Event> 數目等於 0。"
            print(f"❌ {err_msg}")
            handle_analysis_error("ZERO_EVENTS", err_msg, absolute_path)
            return
            
        # 指標 3：檢查地震時間範圍
        dates = []
        for eq in events:
            date_node = eq.find('HKTDate')
            if date_node is not None and date_node.text:
                dates.append(date_node.text.strip())
        
        valid_dates = [d for d in dates if d.isdigit() and len(d) == 8]
        
        if valid_dates:
            valid_dates.sort()
            oldest_raw = valid_dates[0]
            latest_raw = valid_dates[-1]
            
            oldest_date_str = f"{oldest_raw[:4]}-{oldest_raw[4:6]}-{oldest_raw[6:8]}"
            latest_date_str = f"{latest_raw[:4]}-{latest_raw[4:6]}-{latest_raw[6:8]}"
            print(f"3. 地震時間範圍    : [最舊] {oldest_date_str} ~ [最新] {latest_date_str}")
            
            # 檢查最舊日期是否大於 31 日
            oldest_date_obj = datetime.datetime.strptime(oldest_raw, "%Y%m%d").date()
            today = datetime.date.today()
            days_diff = (today - oldest_date_obj).days
            
            if days_diff > 31:
                err_msg = f"最舊的地震日期 ({oldest_date_str}) 距離今天已有 {days_diff} 日，大於 31 日。"
                print(f"⚠️ 提示: {err_msg}")
                handle_analysis_error("OLDEST_DATE_EXCEEDS_31_DAYS", err_msg, absolute_path)
        else:
            print(f"3. 地震時間範圍    : ❌ 無法提取有效日期進行比對")
            
    except ET.ParseError:
        err_msg = "XML 結構損毀，無法解析標籤。"
        print(f"❌ {err_msg}")
        handle_analysis_error("XML_PARSE_ERROR", err_msg, absolute_path)
    except Exception as e:
        print(f"❌ 分析過程中發生未預期錯誤: {e}")
        handle_analysis_error("UNEXPECTED_ERROR", str(e), absolute_path)
        
    print("==================================================\n")

if __name__ == "__main__":
    static_urls = [
        "eq_app-30d_e.xml",
        "eq_app-30d_uc.xml"
    ]
    for url in static_urls:
        download_and_check_xml("https://www.weather.gov.hk/gts/QEM/"+url)

