CREATE DATABASE IF NOT EXISTS db_capstone;
USE db_capstone;

CREATE TABLE nguoi_dung (
    nguoi_dung_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    mat_khau VARCHAR(255) NOT NULL,
    ho_ten VARCHAR(255),
    tuoi INT,
    anh_dai_dien VARCHAR(255)
);

CREATE TABLE hinh_anh (
    hinh_id INT AUTO_INCREMENT PRIMARY KEY,
    ten_hinh VARCHAR(255),
    duong_dan VARCHAR(255),
    mo_ta VARCHAR(255),
    nguoi_dung_id INT,
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id) ON DELETE CASCADE
);

CREATE TABLE binh_luan (
    binh_luan_id INT AUTO_INCREMENT PRIMARY KEY,
    nguoi_dung_id INT,
    hinh_id INT,
    ngay_binh_luan DATETIME DEFAULT CURRENT_TIMESTAMP,
    noi_dung VARCHAR(255),
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id) ON DELETE CASCADE,
    FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id) ON DELETE CASCADE
);

CREATE TABLE luu_anh (
    nguoi_dung_id INT,
    hinh_id INT,
    ngay_luu DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (nguoi_dung_id, hinh_id),
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id) ON DELETE CASCADE,
    FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id) ON DELETE CASCADE
);

-- ==================== DATA MẪU ĐỂ TEST ====================
-- Mật khẩu: 1234 (đã hash bằng bcrypt)
INSERT INTO nguoi_dung (email, mat_khau, ho_ten, tuoi, anh_dai_dien) VALUES 
('hoan@gmail.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Khai Hoan', 21, ''),
('sang@gmail.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Sang Nguyen', 22, ''),
('test@gmail.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Test User', 25, '');

-- Thêm một số hình ảnh mẫu
INSERT INTO hinh_anh (ten_hinh, duong_dan, mo_ta, nguoi_dung_id) VALUES
('Sunset Beach', '/public/img/sample1.jpg', 'Beautiful sunset at the beach', 1),
('Mountain View', '/public/img/sample2.jpg', 'Amazing mountain landscape', 1),
('City Night', '/public/img/sample3.jpg', 'City lights at night', 2),
('Nature Forest', '/public/img/sample4.jpg', 'Green forest in spring', 2),
('Abstract Art', '/public/img/sample5.jpg', 'Modern abstract artwork', 3);

-- Thêm bình luận mẫu
INSERT INTO binh_luan (nguoi_dung_id, hinh_id, noi_dung) VALUES
(2, 1, 'Ảnh đẹp quá!'),
(3, 1, 'Tuyệt vời!'),
(1, 3, 'Thích góc chụp này'),
(3, 2, 'Đẹp lắm bạn ơi');

-- Thêm lưu ảnh mẫu
INSERT INTO luu_anh (nguoi_dung_id, hinh_id) VALUES
(1, 3),
(1, 4),
(2, 1),
(2, 5),
(3, 1),
(3, 2);