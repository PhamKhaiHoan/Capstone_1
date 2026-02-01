# Capstone Project - Pinterest Clone

## Mô tả

Backend API và Frontend cho ứng dụng Pinterest Clone - Cybersoft Capstone Project

## Công nghệ sử dụng

- **Backend:** Node.js, Express.js, Sequelize ORM
- **Database:** MySQL 8.0
- **Authentication:** JWT, Bcrypt
- **File Upload:** Multer (max 20MB)
- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **Containerization:** Docker, Docker Compose

## Cấu trúc thư mục

```
├── db/
│   └── db_capstone.sql          # Database schema & sample data
├── public/
│   ├── css/
│   │   └── style.css            # Frontend styles
│   ├── js/
│   │   ├── api.js               # API helper functions
│   │   ├── auth.js              # Authentication logic
│   │   ├── home.js              # Home page logic
│   │   ├── detail.js            # Detail page logic
│   │   ├── profile.js           # Profile page logic
│   │   └── upload.js            # Upload page logic
│   ├── img/                     # Uploaded images
│   ├── index.html               # Home page
│   ├── detail.html              # Image detail page
│   ├── profile.html             # User profile page
│   └── upload.html              # Upload page
├── src/
│   ├── config/
│   │   ├── db_connect.js        # Database connection
│   │   └── response.js          # Response formatter
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   ├── imageController.js   # Image logic
│   │   └── userController.js    # User logic
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   └── upload.js            # Multer config
│   ├── models/
│   │   ├── User.js
│   │   ├── Image.js
│   │   ├── Comment.js
│   │   ├── SaveImage.js
│   │   └── index.js             # Model associations
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── imageRoutes.js
│   │   ├── userRoutes.js
│   │   └── index.js
│   └── index.js                 # Entry point
├── docker-compose.yml
├── Dockerfile
├── package.json
└── .env.example
```

## Cài đặt và Chạy

### Sử dụng Docker (Khuyến nghị)

```bash
# Build và chạy containers
docker-compose up --build

# Chạy ở chế độ nền
docker-compose up -d --build

# Dừng containers
docker-compose down

# Xem logs
docker-compose logs -f app
```

### Chạy Local (Không dùng Docker)

1. Cài đặt dependencies:

```bash
npm install
```

2. Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

3. Import database:

```bash
mysql -u root -p db_capstone < db/db_capstone.sql
```

4. Chạy server:

```bash
npm run dev    # Development
npm start      # Production
```

## Truy cập

- **Frontend:** http://localhost:8080
- **API:** http://localhost:8080/api
- **Database (TablePlus):** localhost:3307, user: root, password: root

## API Endpoints

### Authentication

| Method | Endpoint           | Mô tả     | Auth |
| ------ | ------------------ | --------- | ---- |
| POST   | `/api/auth/signup` | Đăng ký   | ❌   |
| POST   | `/api/auth/login`  | Đăng nhập | ❌   |

### Images

| Method | Endpoint                      | Mô tả             | Auth |
| ------ | ----------------------------- | ----------------- | ---- |
| GET    | `/api/images/get-list`        | Lấy danh sách ảnh | ❌   |
| GET    | `/api/images/search/:name`    | Tìm kiếm ảnh      | ❌   |
| GET    | `/api/images/detail/:id`      | Chi tiết ảnh      | ❌   |
| GET    | `/api/images/comments/:id`    | Lấy bình luận     | ❌   |
| GET    | `/api/images/check-saved/:id` | Kiểm tra đã lưu   | ✅   |
| POST   | `/api/images/comment`         | Đăng bình luận    | ✅   |
| POST   | `/api/images/save/:id`        | Lưu ảnh           | ✅   |
| DELETE | `/api/images/unsave/:id`      | Hủy lưu ảnh       | ✅   |
| POST   | `/api/images/upload`          | Upload ảnh        | ✅   |
| DELETE | `/api/images/:id`             | Xóa ảnh           | ✅   |

### Users

| Method | Endpoint                   | Mô tả              | Auth |
| ------ | -------------------------- | ------------------ | ---- |
| GET    | `/api/users/get-info`      | Thông tin user     | ✅   |
| GET    | `/api/users/get-saved`     | Ảnh đã lưu         | ✅   |
| GET    | `/api/users/get-created`   | Ảnh đã tạo         | ✅   |
| PUT    | `/api/users/update-info`   | Cập nhật thông tin | ✅   |
| PUT    | `/api/users/update-avatar` | Cập nhật avatar    | ✅   |

## Authentication

Các API yêu cầu xác thực cần gửi token trong header:

```
Authorization: Bearer <your_token>
```

## Test với Postman

Import file `Capstone_Pinterest_API.postman_collection.json` vào Postman.

## Tài khoản test

| Email          | Password |
| -------------- | -------- |
| hoan@gmail.com | 1234     |
| sang@gmail.com | 1234     |
| test@gmail.com | 1234     |

## Database ERD

- **nguoi_dung:** Thông tin người dùng
- **hinh_anh:** Thông tin hình ảnh
- **binh_luan:** Bình luận trên ảnh
- **luu_anh:** Lưu ảnh (quan hệ N-N)

---

**Author:** Pham Khai Hoan  
**Cybersoft Academy**
