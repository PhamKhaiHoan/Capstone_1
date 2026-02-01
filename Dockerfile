# Dùng Node v18 gọn nhẹ
FROM node:18-alpine

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy file package để cài thư viện trước (tối ưu cache)
COPY package*.json ./
RUN npm install

# Copy toàn bộ code vào
COPY . .

# Mở port 8080
EXPOSE 8080

# Chạy lệnh start (định nghĩa trong package.json)
CMD ["npm", "start"]