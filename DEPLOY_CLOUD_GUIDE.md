# Hướng Dẫn Deploy Miễn Phí Lên Cloud (Render.com & MongoDB Atlas)

Quá trình này gồm 3 bước chính. File `render.yaml` tôi (AI) đã tạo sẵn trong mã nguồn sẽ tự động đảm nhiệm 80% cấu hình kỹ thuật, việc của bạn chỉ là click chuột trên giao diện của các nhà cung cấp.

---

## Bước 1: Setup MongoDB Atlas (Database đám mây)

MongoDB Atlas cung cấp gói M0 Cluster vĩnh viễn miễn phí với dung lượng 512MB, rất tuyệt để kiểm thử và chạy MVP.

1. **Tạo tài khoản:** Truy cập [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register) và đăng ký.
2. **Tạo Cluster:** Bấm `Build a Database` -> Chọn gói **M0 Free** -> Bấm **Create**. Chờ vài phút để cụm máy chủ khởi tạo.
3. **Tạo User Database:** 
   - Điền **Username** và **Password** (Hãy lưu Password này lại).
   - Bấm **Create User**.
4. **Cấu hình Network:** 
   - Chuyển sang mục **Network Access** ở menu trái.
   - Bấm **Add IP Address** -> Chọn **Allow Access From Anywhere** (`0.0.0.0/0`). Điều này để Render.com có thể kết nối vào DB.
   - Bấm **Confirm**.
5. **Lấy Connection String:** 
   - Bấm nút **Connect** ở giao diện Cluster chính -> Chọn **Drivers** (Node.js hoặc C# đều được).
   - Sao chép đoạn chuỗi kết nối. Nó có dạng: `mongodb+srv://<username>:<password>@clusterxyz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`.
   - **Lưu ý quan trọng:** Thay `<password>` bằng mật khẩu bạn đã tạo ở Mục 3. Lưu chuỗi này ra một file note.

---

## Bước 2: Deploy Backend bằng Render.com

Render.com cho phép chạy Docker Web Services hoàn toàn miễn phí (sẽ tự "ngủ" nếu không ai dùng trong 15 phút, và mất vài giây để thức dậy).

1. **Commit Code:** Đảm bảo bạn đã `git commit` và `git push` toàn bộ source code (bao gồm file `render.yaml` tôi vừa tạo) lên nhánh `main` của GitHub.
2. **Tạo tài khoản Render:** Đăng nhập vào [https://render.com](https://render.com) bằng tài khoản GitHub của bạn.
3. **Sử dụng Blueprint:** 
   - Trên Dashboard của Render, bấm nút **New** -> Chọn **Blueprint**.
   - Render sẽ yêu cầu cấp quyền truy cập vào GitHub. Hãy cấp quyền đọc kho lưu trữ `scrl_app` của bạn.
4. **Cấu hình tự động:**
   - Khi chọn kho `scrl_app`, Render sẽ tự động phát hiện file `render.yaml` và hỏi bạn có muốn cài đặt theo nó không.
   - Tại màn hình này, Render sẽ hiển thị **các ô trống yêu cầu điền giá trị Secret** (do tôi đã cấu hình `sync: false` trong file yaml để bảo mật). Bạn hãy điền các thông số:
     - `MongoDbSettings__ConnectionString`: Dán chuỗi kết nối từ MongoDB Atlas ở Bước 1.
     - `JWT__SecretKey`: Nhập chuỗi secret bảo mật JWT cũ (hoặc chuỗi mới mạnh hơn).
     - `EmailSettings__ApiKey`: API key của Brevo Transactional Email; đồng thời xác minh `SenderEmail` trong Brevo.
     - Các key Cloudinary tương ứng.
5. **Khởi chạy:** Bấm **Apply** hoặc **Create Service**. Render sẽ bắt đầu kéo source code, đọc `Dockerfile` và build backend.
6. **Lấy URL:** Quá trình build lần đầu tốn khoảng 5 - 10 phút. Nếu thành công, bạn sẽ thấy góc trên cùng bên trái của dự án có link gốc, ví dụ: `https://scrl-backend.onrender.com`.

---

## Bước 3: Đưa App Mobile Lên Production

Bây giờ Backend API đã "sống" trên Internet.

1. Bạn quay lại thư mục `feSCRL` ở máy tính của mình.
2. Mở file `.env` (hoặc tạo file `.env.production`).
3. Đổi biến môi trường thành:
   `EXPO_PUBLIC_API_BASE_URL=https://scrl-backend.onrender.com/api` (Nhớ thêm `/api` nếu API của C# quy định prefix này).
4. Bạn có thể test trực tiếp bằng cách chạy `npm start` trên máy. App trên điện thoại giờ đây sẽ gọi thẳng lên máy chủ mạng thay vì máy tính nội bộ!
