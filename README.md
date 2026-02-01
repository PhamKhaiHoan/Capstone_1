# Capstone Project - Pinterest Clone API

## 📝 Mô tả

Backend API cho ứng dụng Pinterest Clone - Cybersoft Capstone Project 1

## 🚀 Công nghệ sử dụng

- **Node.js** + **Express.js** - Backend Framework
- **MySQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **Multer** - File Upload
- **Docker** - Containerization

## 📁 Cấu trúc thư mục

```
├── db/                     # SQL scripts
│   └── db_capstone.sql
├── public/
│   └── img/               # Uploaded images
├── src/
│   ├── config/            # Configurations
│   │   ├── db_connect.js
│   │   └── response.js
│   ├── controllers/       # Business logic
│   │   ├── authController.js
│   │   ├── imageController.js
│   │   └── userController.js
│   ├── middleware/        # Middlewares
│   │   ├── auth.js
│   │   └── upload.js
│   ├── models/            # Database models
│   │   ├── User.js
│   │   ├── Image.js
│   │   ├── Comment.js
│   │   ├── SaveImage.js
│   │   └── index.js
│   ├── routes/            # API routes
│   │   ├── authRoutes.js
│   │   ├── imageRoutes.js
│   │   ├── userRoutes.js
│   │   └── index.js
│   └── index.js           # Entry point
├── docker-compose.yml
├── Dockerfile
├── package.json
└── Capstone_Pinterest_API.postman_collection.json
```

## 🛠️ Cài đặt & Chạy

### Sử dụng Docker (Khuyến nghị)

```bash
# Build và chạy containers
docker-compose up --build

# Chạy background
docker-compose up -d --build

# Dừng containers
docker-compose down

# Xem logs
docker-compose logs -f app
```

### Chạy Local (không Docker)

1. Cài đặt dependencies:

```bash
npm install
```

2. Tạo file `.env`:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=root
DB_NAME=db_capstone
DB_PORT=3306
PORT=8080
JWT_SECRET=your_secret_key
```

3. Import database:

```bash
mysql -u root -p < db/db_capstone.sql
```

4. Chạy server:

```bash
npm run dev   # Development mode
npm start     # Production mode
```

## 📚 API Endpoints

### Authentication

| Method | Endpoint           | Mô tả     | Auth |
| ------ | ------------------ | --------- | ---- |
| POST   | `/api/auth/signup` | Đăng ký   | ❌   |
| POST   | `/api/auth/login`  | Đăng nhập | ❌   |

### Images (Trang chủ & Chi tiết)

| Method | Endpoint                      | Mô tả                    | Auth |
| ------ | ----------------------------- | ------------------------ | ---- |
| GET    | `/api/images/get-list`        | Lấy danh sách ảnh        | ❌   |
| GET    | `/api/images/search/:name`    | Tìm kiếm ảnh theo tên    | ❌   |
| GET    | `/api/images/detail/:id`      | Chi tiết ảnh & người tạo | ❌   |
| GET    | `/api/images/comments/:id`    | Bình luận theo id ảnh    | ❌   |
| GET    | `/api/images/check-saved/:id` | Kiểm tra đã lưu ảnh      | ✅   |
| POST   | `/api/images/comment`         | Đăng bình luận           | ✅   |
| POST   | `/api/images/save/:id`        | Lưu ảnh                  | ✅   |
| DELETE | `/api/images/unsave/:id`      | Hủy lưu ảnh              | ✅   |
| POST   | `/api/images/upload`          | Upload ảnh mới           | ✅   |
| DELETE | `/api/images/:id`             | Xóa ảnh đã tạo           | ✅   |

### Users (Quản lý ảnh & Thông tin cá nhân)

| Method | Endpoint                   | Mô tả                | Auth |
| ------ | -------------------------- | -------------------- | ---- |
| GET    | `/api/users/get-info`      | Lấy thông tin user   | ✅   |
| GET    | `/api/users/get-saved`     | Danh sách ảnh đã lưu | ✅   |
| GET    | `/api/users/get-created`   | Danh sách ảnh đã tạo | ✅   |
| PUT    | `/api/users/update-info`   | Cập nhật thông tin   | ✅   |
| PUT    | `/api/users/update-avatar` | Cập nhật avatar      | ✅   |

## 🔐 Authentication

Các API yêu cầu xác thực cần gửi token trong header:

```
Authorization: Bearer <your_token>
```

## 📦 Test với Postman

Import file `Capstone_Pinterest_API.postman_collection.json` vào Postman để test.

**Lưu ý:** Sau khi login, token sẽ tự động được lưu vào biến `{{token}}`.

## 👤 Tài khoản test

| Email          | Password |
| -------------- | -------- |
| hoan@gmail.com | 1234     |
| sang@gmail.com | 1234     |
| test@gmail.com | 1234     |

## 📊 Database ERD

- **nguoi_dung**: Thông tin người dùng
- **hinh_anh**: Thông tin hình ảnh
- **binh_luan**: Bình luận của user trên ảnh
- **luu_anh**: Bảng trung gian lưu ảnh (N-N)

## 🔗 Kết nối Database qua TablePlus

- **Host:** localhost
- **Port:** 3307 (khi dùng Docker)
- **User:** root
- **Password:** root
- **Database:** db_capstone

---

**Author:** Pham Khai Hoan  
**Cybersoft Academy**
