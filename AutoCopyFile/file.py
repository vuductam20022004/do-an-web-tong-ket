import os
import shutil
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# Các thư mục cần giám sát và sao chép
SOURCE_FOLDER_1 = r"D:\OneDrive\Máy tính\DO-AN-WEB\do-an-web\src\image\AvatarUser"  # Thay bằng đường dẫn Folder 1
DEST_FOLDER_1 = r"D:\OneDrive\Máy tính\DO-AN-WEB\do-an-web-admin\src\image\AvatarUser"   # Thay bằng đường dẫn Folder 2
SOURCE_FOLDER_2 = r"D:\OneDrive\Máy tính\DO-AN-WEB\do-an-web\src\image\monAn"  # Thay bằng đường dẫn Folder 3
DEST_FOLDER_2 = r"D:\OneDrive\Máy tính\DO-AN-WEB\do-an-web-admin\src\image\monAn"   # Thay bằng đường dẫn Folder 4

class FolderSyncHandler(FileSystemEventHandler):
    def __init__(self, source_folder, dest_folder):
        super().__init__()
        self.source_folder = source_folder
        self.dest_folder = dest_folder

    def on_created(self, event):
        if not event.is_directory:  # Chỉ xử lý file, bỏ qua thư mục con
            src_path = event.src_path
            dest_path = os.path.join(self.dest_folder, os.path.basename(src_path))
            shutil.copy2(src_path, dest_path)  # Sao chép file sang thư mục đích
            print(f"File {src_path} copied to {dest_path}")

def setup_folder_sync(source_folder, dest_folder):
    if not os.path.exists(dest_folder):
        os.makedirs(dest_folder)  # Tạo thư mục đích nếu chưa tồn tại

    event_handler = FolderSyncHandler(source_folder, dest_folder)
    observer = Observer()
    observer.schedule(event_handler, path=source_folder, recursive=False)
    observer.start()
    return observer

if __name__ == "__main__":
    # Cài đặt giám sát cho các thư mục
    observer1 = setup_folder_sync(SOURCE_FOLDER_1, DEST_FOLDER_1)
    observer2 = setup_folder_sync(SOURCE_FOLDER_2, DEST_FOLDER_2)

    print("Monitoring started. Press Ctrl+C to stop.")
    try:
        while True:
            pass  # Chương trình chạy liên tục
    except KeyboardInterrupt:
        observer1.stop()
        observer2.stop()
    observer1.join()
    observer2.join()
