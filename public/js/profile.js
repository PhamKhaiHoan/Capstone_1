// Profile Page
let currentTab = "created";
let userInfo = null;

document.addEventListener("DOMContentLoaded", () => {
  if (!requireAuth()) return;
  loadProfile();
});

// Load user profile
async function loadProfile() {
  try {
    const result = await api.get("/users/get-info", true);

    if (result.statusCode === 200) {
      userInfo = result.content;
      renderProfile();
      loadImages(currentTab);
    } else {
      showToast("Không thể tải thông tin!", "error");
    }
  } catch (error) {
    showToast("Có lỗi xảy ra!", "error");
    console.error(error);
  }
}

// Render profile info
function renderProfile() {
  const avatarEl = document.getElementById("profileAvatar");
  const nameEl = document.getElementById("profileName");
  const emailEl = document.getElementById("profileEmail");

  // Avatar
  if (userInfo.anh_dai_dien) {
    avatarEl.innerHTML = `<img src="${getImageUrl(userInfo.anh_dai_dien)}" alt="Avatar">`;
  } else {
    avatarEl.textContent = getInitials(userInfo.ho_ten || userInfo.email);
  }

  // Name & Email
  nameEl.textContent = userInfo.ho_ten || "Chưa đặt tên";
  emailEl.textContent = userInfo.email;

  // Fill edit form
  document.getElementById("editName").value = userInfo.ho_ten || "";
  document.getElementById("editAge").value = userInfo.tuoi || "";
  document.getElementById("editAvatar").value = userInfo.anh_dai_dien || "";
}

// Switch tab
function switchTab(tab) {
  currentTab = tab;

  // Update tab buttons
  document
    .getElementById("tabCreated")
    .classList.toggle("active", tab === "created");
  document
    .getElementById("tabSaved")
    .classList.toggle("active", tab === "saved");

  // Load images
  loadImages(tab);
}

// Load images based on tab
async function loadImages(tab) {
  const grid = document.getElementById("imageGrid");
  const loading = document.getElementById("loading");
  const noResults = document.getElementById("noResults");

  loading.style.display = "block";
  grid.innerHTML = "";
  noResults.style.display = "none";

  try {
    const endpoint =
      tab === "created" ? "/users/get-created" : "/users/get-saved";
    const result = await api.get(endpoint, true);

    loading.style.display = "none";

    if (result.statusCode === 200 && result.content.length > 0) {
      renderImages(result.content, tab === "created");
    } else {
      noResults.style.display = "block";
      noResults.querySelector("p").textContent =
        tab === "created" ? "Bạn chưa tạo ảnh nào" : "Bạn chưa lưu ảnh nào";
    }
  } catch (error) {
    loading.style.display = "none";
    noResults.style.display = "block";
    console.error(error);
  }
}

// Render images
function renderImages(images, canDelete = false) {
  const grid = document.getElementById("imageGrid");
  grid.innerHTML = "";

  images.forEach((image) => {
    const card = createProfileImageCard(image, canDelete);
    grid.appendChild(card);
  });
}

// Create image card for profile
function createProfileImageCard(image, canDelete) {
  const card = document.createElement("div");
  card.className = "image-card";
  card.onclick = () =>
    (window.location.href = `detail.html?id=${image.hinh_id}`);

  const minHeight = 200;
  const maxHeight = 350;
  const randomHeight =
    Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

  card.innerHTML = `
        <img src="${getImageUrl(image.duong_dan)}" 
             alt="${image.ten_hinh || "Image"}"
             style="min-height: ${randomHeight}px; object-fit: cover;"
             onerror="this.src='https://via.placeholder.com/300x${randomHeight}?text=Image'">
        <div class="image-overlay">
            <div class="overlay-top">
                ${
                  canDelete
                    ? `
                    <button class="btn btn-save" style="background: #111;" 
                            onclick="event.stopPropagation(); deleteImage(${image.hinh_id})">
                        <i class="fas fa-trash"></i>
                    </button>
                `
                    : ""
                }
            </div>
            <div class="overlay-bottom">
                <span class="image-title">${image.ten_hinh || "Không có tiêu đề"}</span>
            </div>
        </div>
    `;

  return card;
}

// Delete image
async function deleteImage(imageId) {
  if (!confirm("Bạn có chắc muốn xóa ảnh này?")) return;

  try {
    const result = await api.delete(`/images/${imageId}`, true);

    if (result.statusCode === 200) {
      showToast("Đã xóa ảnh!", "success");
      loadImages(currentTab);
    } else {
      showToast(result.message || "Không thể xóa ảnh!", "error");
    }
  } catch (error) {
    showToast("Có lỗi xảy ra!", "error");
    console.error(error);
  }
}

// Handle update profile
async function handleUpdateProfile(event) {
  event.preventDefault();

  const form = event.target;
  const data = {
    ho_ten: form.ho_ten.value,
    tuoi: form.tuoi.value ? parseInt(form.tuoi.value) : null,
    anh_dai_dien: form.anh_dai_dien.value,
  };

  try {
    const result = await api.put("/users/update-info", data, true);

    if (result.statusCode === 200) {
      userInfo = result.content;

      // Update localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...storedUser, ...userInfo }),
      );

      renderProfile();
      hideModal("editModal");
      showToast("Cập nhật thành công!", "success");
    } else {
      showToast(result.message || "Cập nhật thất bại!", "error");
    }
  } catch (error) {
    showToast("Có lỗi xảy ra!", "error");
    console.error(error);
  }
}
