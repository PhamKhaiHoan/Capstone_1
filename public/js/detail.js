// Detail Page - Load and display image details
let currentImageId = null;
let isSaved = false;

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  currentImageId = urlParams.get("id");

  if (currentImageId) {
    loadImageDetail();
  } else {
    window.location.href = "index.html";
  }
});

// Load image detail
async function loadImageDetail() {
  const container = document.getElementById("detailContent");
  const loading = document.getElementById("loading");

  loading.style.display = "block";
  container.style.display = "none";

  try {
    // Load image detail
    const imageResult = await api.get(`/images/detail/${currentImageId}`);

    if (imageResult.statusCode !== 200 || !imageResult.content) {
      showToast("Không tìm thấy ảnh!", "error");
      setTimeout(() => (window.location.href = "index.html"), 1500);
      return;
    }

    const image = imageResult.content;

    // Load comments
    const commentsResult = await api.get(`/images/comments/${currentImageId}`);
    const comments = commentsResult.content || [];

    // Check if saved (if logged in)
    if (isLoggedIn()) {
      const savedResult = await api.get(
        `/images/check-saved/${currentImageId}`,
        true,
      );
      isSaved = savedResult.content?.saved || false;
    }

    // Render content
    renderDetail(image, comments);

    loading.style.display = "none";
    container.style.display = "flex";
  } catch (error) {
    loading.style.display = "none";
    showToast("Có lỗi xảy ra!", "error");
    console.error(error);
  }
}

// Render detail content
function renderDetail(image, comments) {
  const container = document.getElementById("detailContent");
  const authorName = image.User?.ho_ten || "Ẩn danh";
  const initials = getInitials(authorName);

  container.innerHTML = `
        <div class="detail-image">
            <img src="${getImageUrl(image.duong_dan)}" 
                 alt="${image.ten_hinh || "Image"}"
                 onerror="this.src='https://via.placeholder.com/500x600?text=Image'">
        </div>
        <div class="detail-info">
            <div class="detail-actions">
                <button id="saveBtn" class="btn ${isSaved ? "btn-saved btn-save" : "btn-save"}" onclick="toggleSave()">
                    ${isSaved ? "Đã lưu" : "Lưu"}
                </button>
            </div>
            
            <h1 class="detail-title">${image.ten_hinh || "Không có tiêu đề"}</h1>
            <p class="detail-description">${image.mo_ta || "Không có mô tả"}</p>
            
            <div class="detail-author">
                <div class="author-avatar">${initials}</div>
                <div>
                    <div class="author-name">${authorName}</div>
                </div>
            </div>
            
            <div class="comments-section">
                <h3><i class="fas fa-comments"></i> ${comments.length} bình luận</h3>
                
                <form class="comment-form" onsubmit="postComment(event)">
                    <input type="text" id="commentInput" placeholder="Thêm nhận xét..." required>
                    <button type="submit" class="btn btn-primary">Gửi</button>
                </form>
                
                <div id="commentList" class="comment-list">
                    ${renderComments(comments)}
                </div>
            </div>
        </div>
    `;
}

// Render comments
function renderComments(comments) {
  if (comments.length === 0) {
    return '<p style="color: #999; text-align: center; padding: 20px;">Chưa có bình luận nào</p>';
  }

  return comments
    .map((comment) => {
      const name = comment.User?.ho_ten || "Ẩn danh";
      const initials = getInitials(name);

      return `
            <div class="comment-item">
                <div class="author-avatar">${initials}</div>
                <div class="comment-content">
                    <div class="comment-author">${name}</div>
                    <div class="comment-text">${comment.noi_dung}</div>
                    <div class="comment-date">${formatDate(comment.ngay_binh_luan)}</div>
                </div>
            </div>
        `;
    })
    .join("");
}

// Toggle save/unsave
async function toggleSave() {
  if (!isLoggedIn()) {
    showToast("Vui lòng đăng nhập để lưu ảnh!", "error");
    showModal("loginModal");
    return;
  }

  const btn = document.getElementById("saveBtn");

  try {
    let result;
    if (isSaved) {
      result = await api.delete(`/images/unsave/${currentImageId}`, true);
      if (result.statusCode === 200) {
        isSaved = false;
        btn.classList.remove("btn-saved");
        btn.textContent = "Lưu";
        showToast("Đã hủy lưu ảnh!", "success");
      }
    } else {
      result = await api.post(`/images/save/${currentImageId}`, {}, true);
      if (result.statusCode === 201) {
        isSaved = true;
        btn.classList.add("btn-saved");
        btn.textContent = "Đã lưu";
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

// Post comment
async function postComment(event) {
  event.preventDefault();

  if (!isLoggedIn()) {
    showToast("Vui lòng đăng nhập để bình luận!", "error");
    showModal("loginModal");
    return;
  }

  const input = document.getElementById("commentInput");
  const content = input.value.trim();

  if (!content) return;

  try {
    const result = await api.post(
      "/images/comment",
      {
        hinh_id: parseInt(currentImageId),
        noi_dung: content,
      },
      true,
    );

    if (result.statusCode === 201) {
      input.value = "";
      showToast("Đã đăng bình luận!", "success");

      // Reload comments
      const commentsResult = await api.get(
        `/images/comments/${currentImageId}`,
      );
      const commentList = document.getElementById("commentList");
      commentList.innerHTML = renderComments(commentsResult.content || []);

      // Update comment count
      const h3 = document.querySelector(".comments-section h3");
      h3.innerHTML = `<i class="fas fa-comments"></i> ${commentsResult.content?.length || 0} bình luận`;
    } else {
      showToast(result.message || "Có lỗi xảy ra!", "error");
    }
  } catch (error) {
    showToast("Có lỗi xảy ra!", "error");
    console.error(error);
  }
}
