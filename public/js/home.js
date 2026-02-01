// Home Page - Load and display images
document.addEventListener("DOMContentLoaded", () => {
  loadImages();
  setupSearch();
});

// Load all images
async function loadImages() {
  const grid = document.getElementById("imageGrid");
  const loading = document.getElementById("loading");
  const noResults = document.getElementById("noResults");

  if (!grid) return;

  loading.style.display = "block";
  grid.innerHTML = "";
  noResults.style.display = "none";

  try {
    const result = await api.get("/images/get-list");

    loading.style.display = "none";

    if (result.statusCode === 200 && result.content.length > 0) {
      renderImages(result.content);
    } else {
      noResults.style.display = "block";
    }
  } catch (error) {
    loading.style.display = "none";
    noResults.style.display = "block";
    console.error(error);
  }
}

// Search images
async function searchImages(keyword) {
  const grid = document.getElementById("imageGrid");
  const loading = document.getElementById("loading");
  const noResults = document.getElementById("noResults");

  if (!keyword.trim()) {
    loadImages();
    return;
  }

  loading.style.display = "block";
  grid.innerHTML = "";
  noResults.style.display = "none";

  try {
    const result = await api.get(
      `/images/search/${encodeURIComponent(keyword)}`,
    );

    loading.style.display = "none";

    if (result.statusCode === 200 && result.content.length > 0) {
      renderImages(result.content);
    } else {
      noResults.style.display = "block";
    }
  } catch (error) {
    loading.style.display = "none";
    noResults.style.display = "block";
    console.error(error);
  }
}

// Render images to grid
function renderImages(images) {
  const grid = document.getElementById("imageGrid");
  grid.innerHTML = "";

  images.forEach((image) => {
    const card = createImageCard(image);
    grid.appendChild(card);
  });
}

// Create image card element
function createImageCard(image) {
  const card = document.createElement("div");
  card.className = "image-card";
  card.onclick = () =>
    (window.location.href = `detail.html?id=${image.hinh_id}`);

  const authorName = image.User?.ho_ten || "Ẩn danh";
  const initials = getInitials(authorName);

  // Random height for masonry effect
  const minHeight = 200;
  const maxHeight = 400;
  const randomHeight =
    Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

  card.innerHTML = `
        <img src="${getImageUrl(image.duong_dan)}" 
             alt="${image.ten_hinh || "Image"}"
             style="min-height: ${randomHeight}px; object-fit: cover;"
             onerror="this.src='https://via.placeholder.com/300x${randomHeight}?text=Image'">
        <div class="image-overlay">
            <div class="overlay-top">
                <button class="btn btn-save" onclick="event.stopPropagation(); saveImage(${image.hinh_id}, this)">
                    Lưu
                </button>
            </div>
            <div class="overlay-bottom">
                <div class="image-author">
                    <div class="author-avatar">${initials}</div>
                    <span>${authorName}</span>
                </div>
            </div>
        </div>
    `;

  return card;
}

// Setup search functionality
function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  let debounceTimer;

  searchInput.addEventListener("input", (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchImages(e.target.value);
    }, 500);
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      clearTimeout(debounceTimer);
      searchImages(e.target.value);
    }
  });
}

// Save/Unsave image
async function saveImage(imageId, button) {
  if (!isLoggedIn()) {
    showToast("Vui lòng đăng nhập để lưu ảnh!", "error");
    showModal("loginModal");
    return;
  }

  const isSaved = button.classList.contains("btn-saved");

  try {
    let result;
    if (isSaved) {
      result = await api.delete(`/images/unsave/${imageId}`, true);
      if (result.statusCode === 200) {
        button.classList.remove("btn-saved");
        button.textContent = "Lưu";
        showToast("Đã hủy lưu ảnh!", "success");
      }
    } else {
      result = await api.post(`/images/save/${imageId}`, {}, true);
      if (result.statusCode === 201) {
        button.classList.add("btn-saved");
        button.textContent = "Đã lưu";
        showToast("Đã lưu ảnh!", "success");
      }
    }

    if (result.statusCode >= 400) {
      showToast(result.message || "Có lỗi xảy ra!", "error");
    }
  } catch (error) {
    showToast("Có lỗi xảy ra!", "error");
    console.error(error);
  }
}
