<div align="center">

# 🎓 SPNC API - English Learning Platform

**API Backend cho nền tảng học tiếng Anh trực tuyến**

[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.19.2-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-6.0+-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)

[![License](https://img.shields.io/badge/License-Private-red?style=flat-square)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)

</div>

---

## 📑 Mục lục

- [🎯 Tổng quan](#-tổng-quan)
- [✨ Tính năng](#-tính-năng)
- [🛠️ Công nghệ](#️-công-nghệ)
- [🚀 Cài đặt](#-cài-đặt)
- [⚙️ Cấu hình](#️-cấu-hình)
- [📚 API Documentation](#-api-documentation)
- [📁 Cấu trúc dự án](#-cấu-trúc-dự-án)
- [🔧 Scripts](#-scripts)

---

## 🎯 Tổng quan

**SPNC API** là hệ thống backend được xây dựng bằng **NestJS** cho nền tảng học tiếng Anh trực tuyến. Hệ thống cung cấp đầy đủ các tính năng từ quản lý người dùng, bài học, bài tập, nhóm học tập, cuộc thi đến thanh toán.

### 🎨 Đặc điểm nổi bật

- ✅ RESTful API với Swagger documentation
- ✅ JWT Authentication với refresh token
- ✅ OAuth 2.0 (Google, Facebook)
- ✅ Role-based Access Control (RBAC)
- ✅ Real-time notifications
- ✅ Payment integration (VNPay, Stripe)
- ✅ File upload (Cloudflare R2, Cloudinary)
- ✅ Email service với Handlebars templates
- ✅ Redis caching
- ✅ Rate limiting & security headers

---

## ✨ Tính năng

### 🔐 Xác thực & Phân quyền

- Đăng ký/Đăng nhập với email và OAuth
- JWT Authentication với Access/Refresh Token
- Email verification và password reset
- Role-based Access Control (Admin, Teacher, Student, Parent)
- Multi-device login management

### 👥 Quản lý Người dùng

- CRUD operations cho users
- Profile management với avatar
- Badges system và achievements
- User statistics và activity tracking
- Soft delete và restore

### 📚 Học tập

- **Literatures**: Quản lý tài liệu học tập (truyện, bài đọc)
- **Lessons**: Quản lý bài học với multimedia
- **Units**: Tổ chức bài học theo units
- **Assignments**: Giao bài tập cho học sinh
- **Submissions**: Nộp và chấm bài tập
- **Progresses**: Theo dõi tiến độ học tập
- **Competitions**: Tổ chức cuộc thi với leaderboard

### 👨‍👩‍👧‍👦 Nhóm & Lớp học

- **Groups**: Quản lý nhóm học tập (Public/Private)
- **Classes**: Quản lý lớp học và enrollment
- **Group Messages**: Real-time messaging trong nhóm
- **Discussions**: Thảo luận với comments
- **Invitations**: Mời tham gia nhóm/lớp

### 💳 Thanh toán & Gói dịch vụ

- **Packages**: Quản lý gói dịch vụ
- **Subscriptions**: Đăng ký và quản lý gói dịch vụ
- **Payments**: Tích hợp VNPay và Stripe
- **Purchases**: Quản lý giao dịch mua hàng

### 🔔 Khác

- **Notifications**: Real-time và email notifications
- **Feedbacks**: Hệ thống phản hồi từ người dùng
- **Supports**: Support ticket system
- **Badges**: Huy hiệu thành tích
- **Feature Flags**: Bật/tắt tính năng
- **Provinces/Districts/Schools**: Quản lý địa danh và trường học

---

## 🛠️ Công nghệ

### Core

- **NestJS** ^11.0.1 - Framework chính
- **TypeScript** ^5.7.3 - Ngôn ngữ lập trình
- **Express** ^5.1.0 - HTTP server

### Database

- **MongoDB** ^8.19.2 với **Mongoose** ^11.0.3
- **Redis** ^5.9.0 với **ioredis** ^5.8.2

### Authentication & Security

- **Passport** với JWT, Google OAuth, Facebook OAuth
- **bcrypt** ^6.0.0 - Mã hóa mật khẩu
- **helmet** ^8.1.0 - Security headers
- **express-rate-limit** ^8.2.1 - Rate limiting

### Validation

- **class-validator** ^0.14.2
- **class-transformer** ^0.5.1
- **zod** ^4.1.12 - Schema validation

### API Documentation

- **@nestjs/swagger** ^11.2.1
- **swagger-ui-express** ^5.0.1

### Payment & Storage

- **VNPay** - Thanh toán Việt Nam
- **Stripe** - Thanh toán quốc tế
- **Cloudflare R2** - Object storage
- **Cloudflare Images** - Image optimization
- **Cloudinary** - Alternative image storage

### Email

- **nodemailer** ^7.0.10 với **handlebars** ^4.7.8

### Testing

- **Jest** ^30.0.0
- **Supertest** ^7.0.0

---

## 🚀 Cài đặt

### Yêu cầu hệ thống

- **Node.js**: >= 18.x
- **MongoDB**: >= 5.0
- **Redis**: >= 6.0

### Bước 1: Clone repository

```bash
git clone <repository-url>
cd spnc-api
```

### Bước 2: Cài đặt dependencies

```bash
npm install
# hoặc
pnpm install
# hoặc
yarn install
```

### Bước 3: Cấu hình environment variables

Tạo file `.env` trong thư mục gốc (xem phần [Cấu hình](#️-cấu-hình))

### Bước 4: Khởi động services

**MongoDB:**

```bash
# Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Redis:**

```bash
# Docker
docker run -d -p 6379:6379 --name redis redis:latest
```

### Bước 5: Chạy ứng dụng

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

---

## ⚙️ Cấu hình

Tạo file `.env` với các biến môi trường sau:

### Cơ bản

```env
NODE_ENV=development
PORT=3000
API_PREFIX=/api
API_VERSION=v1
```

### Database

```env
MONGODB_URI=mongodb://localhost:27017/spnc_db
REDIS_URL=redis://localhost:6379
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

### JWT

```env
JWT_ACCESS_TOKEN_SECRET=your-access-token-secret
JWT_ACCESS_TOKEN_EXPIRATION=1h
JWT_REFRESH_TOKEN_SECRET=your-refresh-token-secret
JWT_REFRESH_TOKEN_EXPIRATION=7d
JWT_VERIFICATION_TOKEN_SECRET=your-verification-token-secret
JWT_VERIFICATION_TOKEN_EXPIRATION=5m
```

**⚠️ Lưu ý**: Generate secrets mạnh cho production:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Email

```env
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### CORS

```env
CORS_ORIGINS=http://localhost:5173,http://localhost:3001
CORS_CREDENTIALS=true
```

### Rate Limiting

```env
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
```

### Swagger

```env
SWAGGER_TITLE=English Learning API
SWAGGER_DESCRIPTION=API documentation for English Learning Platform
SWAGGER_VERSION=1.0.0
SWAGGER_TAG=education,english,learning
SWAGGER_PATH=docs
```

### Payment (Optional)

```env
# VNPay
VNPAY_TMN_CODE=your-tmn-code
VNPAY_HASH_SECRET=your-hash-secret
VNPAY_API_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
VNPAY_RETURN_URL=http://localhost:3000/api/v1/payments/vnpay-return

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### OAuth (Optional)

```env
# Google
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/v1/auths/google/callback

# Facebook
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
```

### Cloudflare (Optional)

```env
CF_ACCOUNT_ID=your-cloudflare-account-id
CF_IMAGES_TOKEN=your-images-token
R2_ACCOUNT_ID=your-r2-account-id
R2_ACCESS_KEY_ID=your-r2-access-key
R2_SECRET_ACCESS_KEY=your-r2-secret-key
R2_BUCKET=your-bucket-name
R2_PUBLIC_BASE=https://your-domain.com
```

### Cloudinary (Optional)

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_FOLDER=english_learning_uploads
```

### Other (Optional)

```env
BODY_LIMIT_JSON=1mb
BODY_LIMIT_URLENCODED=1mb
TRUST_PROXY=false
LOG_LEVEL=debug
OPEN_ROUTER_API=your-open-router-api-key
```

---

## 📚 API Documentation

Sau khi khởi động ứng dụng, truy cập Swagger UI tại:

```
http://localhost:3000/docs
```

### API Base URL

```
http://localhost:3000/api/v1
```

### Authentication

Hầu hết các endpoints yêu cầu Bearer Token:

```http
Authorization: Bearer <your-access-token>
```

### Response Format

```json
{
  "success": true,
  "message": "Thành công",
  "data": { ... },
  "statusCode": 200
}
```

### Ví dụ API Request

**Đăng ký:**

```bash
curl -X POST http://localhost:3000/api/v1/auths/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": "Nguyen Van A",
    "username": "nguyenvana",
    "email": "nguyenvana@gmail.com",
    "password": "SecurePassword123!",
    "role": "student"
  }'
```

**Đăng nhập:**

```bash
curl -X POST http://localhost:3000/api/v1/auths/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nguyenvana@gmail.com",
    "password": "SecurePassword123!"
  }'
```

**Lấy danh sách Literatures:**

```bash
curl -X GET "http://localhost:3000/api/v1/literatures?page=1&limit=10" \
  -H "Authorization: Bearer <access-token>"
```

---

## 📁 Cấu trúc dự án

```
src/
├── app/
│   ├── common/              # Shared utilities
│   │   ├── decorators/      # Custom decorators (@Roles)
│   │   ├── filters/         # Exception filters
│   │   ├── guards/          # Auth guards
│   │   ├── response/        # API response utilities
│   │   └── utils/           # Helper functions
│   ├── configs/             # Configuration modules
│   │   ├── cache/           # Redis configuration
│   │   ├── database/        # MongoDB & Redis configs
│   │   ├── env/             # Environment validation
│   │   └── mail/            # Email configuration
│   ├── modules/             # Feature modules
│   │   ├── auths/           # Authentication
│   │   ├── users/           # User management
│   │   ├── literatures/     # Learning materials
│   │   ├── lessons/         # Lessons
│   │   ├── assignments/     # Assignments
│   │   ├── submissions/     # Submissions
│   │   ├── groups/          # Study groups
│   │   ├── classes/         # Classes
│   │   ├── competitions/    # Competitions
│   │   ├── payments/        # Payments
│   │   ├── packages/        # Service packages
│   │   ├── subscriptions/   # Subscriptions
│   │   ├── notifications/   # Notifications
│   │   ├── feedbacks/       # Feedbacks
│   │   ├── supports/        # Supports
│   │   ├── badges/          # Badges
│   │   ├── progresses/      # Progress tracking
│   │   └── ...              # Other modules
│   └── templates/           # Email templates (Handlebars)
├── app.controller.ts        # Root controller
├── app.module.ts           # Root module
├── app.service.ts          # Root service
└── main.ts                 # Application entry point
```

### Module Structure

Mỗi module tuân theo cấu trúc:

```
module-name/
├── module-name.controller.ts    # HTTP endpoints
├── module-name.service.ts       # Business logic
├── module-name.module.ts        # Module configuration
├── dto/                         # Data Transfer Objects
│   ├── create-module-name.dto.ts
│   └── update-module-name.dto.ts
└── schema/                      # MongoDB schemas
    └── module-name.schema.ts
```

---

## 🔧 Scripts

```bash
# Development
npm run start:dev          # Chạy với watch mode
npm run start:debug       # Chạy với debug mode

# Production
npm run build             # Build ứng dụng
npm run start:prod        # Chạy production build

# Code Quality
npm run format            # Format code với Prettier
npm run lint              # Lint và fix code

# Testing
npm run test              # Chạy unit tests
npm run test:watch        # Chạy tests ở watch mode
npm run test:cov          # Chạy tests với coverage
npm run test:e2e          # Chạy end-to-end tests
```

---

## 🔒 Bảo mật

Hệ thống đã tích hợp các tính năng bảo mật:

- ✅ **Helmet.js** - Security headers
- ✅ **Rate Limiting** - Giới hạn request
- ✅ **CORS** - Kiểm soát truy cập
- ✅ **Input Validation** - Validate tất cả inputs
- ✅ **Password Hashing** - bcrypt với salt
- ✅ **JWT Security** - Secure token generation
- ✅ **SQL Injection Protection** - Mongoose ODM

### Best Practices

1. Không commit `.env` vào git
2. Sử dụng secrets mạnh cho production
3. Cập nhật dependencies thường xuyên
4. Luôn sử dụng HTTPS trong production
5. Validate tất cả inputs
6. Implement proper error handling

---

## 🐛 Troubleshooting

### MongoDB Connection Error

```bash
# Kiểm tra MongoDB đang chạy
mongosh mongodb://localhost:27017
```

### Redis Connection Error

```bash
# Kiểm tra Redis đang chạy
redis-cli ping
```

### Port Already in Use

```bash
# Tìm process đang dùng port
lsof -i :3000          # macOS/Linux
netstat -ano | findstr :3000  # Windows
```

### Email Not Sending

- Kiểm tra EMAIL_USER và EMAIL_PASS
- Đối với Gmail, sử dụng App Password (không phải mật khẩu thường)
- Kiểm tra EMAIL_SERVICE và EMAIL_HOST

---

## 📝 License

**UNLICENSED** - Private project

---

## 👥 Contributors

SPNC Development Team

---

<div align="center">

**Made with ❤️ by SPNC Development Team**

</div>
