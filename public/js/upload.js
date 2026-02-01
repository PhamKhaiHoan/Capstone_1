// Upload Page
let selectedFile = null;

document.addEventListener("DOMContentLoaded", () => {
  if (!requireAuth()) return;
  setupDragAndDrop();
});

// Setup drag and drop
function setupDragAndDrop() {
  const dropzone = document.getElementById("dropzone");

  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropzone.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ["dragenter", "dragover"].forEach((eventName) => {
    dropzone.addEventListener(eventName, () => {
      dropzone.style.borderColor = "#e60023";
      dropzone.style.background = "#fff5f5";
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropzone.addEventListener(eventName, () => {
      dropzone.style.borderColor = "#ccc";
      dropzone.style.background = "#f9f9f9";
    });
  });

  dropzone.addEventListener("drop", handleDrop);
}

// Handle file drop
function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;

  if (files.length > 0) {
    handleFile(files[0]);
  }
}

// Handle file select from input
function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    handleFile(file);
  }
}

// Process selected file
function handleFile(file) {
  // Validate file type
  if (!file.type.startsWith("image/")) {
    showToast("Vui lòng chọn file ảnh!", "error");
    return;
  }

  // Validate file size (20MB)
  if (file.size > 20 * 1024 * 1024) {
    showToast("File quá lớn! Tối đa 20MB", "error");
    return;
  }

  selectedFile = file;

  // Show preview
  const reader = new FileReader();
  reader.onload = function (e) {
    const preview = document.getElementById("preview");
    preview.src = e.target.result;

    const dropzone = document.getElementById("dropzone");
    dropzone.classList.add("has-image");
  };
  reader.readAsDataURL(file);

  // Enable upload button
  document.getElementById("uploadBtn").disabled = false;
}

// Handle upload
async function handleUpload(event) {
  event.preventDefault();

  if (!selectedFile) {
    showToast("Vui lòng chọn ảnh!", "error");
    return;
  }

  const form = event.target;
  const formData = new FormData();

  formData.append("file", selectedFile);
  formData.append("ten_hinh", form.ten_hinh.value);
  formData.append("mo_ta", form.mo_ta.value);

  const uploadBtn = document.getElementById("uploadBtn");
  uploadBtn.disabled = true;
  uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tải...';

  try {
    const result = await api.postFormData("/images/upload", formData, true);

    if (result.statusCode === 201) {
      showToast("Đăng ảnh thành công!", "success");
      setTimeout(() => {
        window.location.href = "profile.html";
      }, 1500);
    } else {
      showToast(result.message || "Đăng ảnh thất bại!", "error");
      uploadBtn.disabled = false;
      uploadBtn.textContent = "Đăng ảnh";
    }
  } catch (error) {
    showToast("Có lỗi xảy ra!", "error");
    uploadBtn.disabled = false;
    uploadBtn.textContent = "Đăng ảnh";
    console.error(error);
  }
}
