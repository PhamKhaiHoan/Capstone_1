// API Configuration
const API_BASE_URL = "http://localhost:8080/api";

// API Helper Functions
const api = {
  // GET request
  get: async (endpoint, auth = false) => {
    const headers = {
      "Content-Type": "application/json",
    };

    if (auth) {
      const token = localStorage.getItem("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers,
    });

    return response.json();
  },

  // POST request
  post: async (endpoint, data, auth = false) => {
    const headers = {
      "Content-Type": "application/json",
    };

    if (auth) {
      const token = localStorage.getItem("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    return response.json();
  },

  // POST with FormData (for file uploads)
  postFormData: async (endpoint, formData, auth = false) => {
    const headers = {};

    if (auth) {
      const token = localStorage.getItem("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: formData,
    });

    return response.json();
  },

  // PUT request
  put: async (endpoint, data, auth = false) => {
    const headers = {
      "Content-Type": "application/json",
    };

    if (auth) {
      const token = localStorage.getItem("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    return response.json();
  },

  // PUT with FormData
  putFormData: async (endpoint, formData, auth = false) => {
    const headers = {};

    if (auth) {
      const token = localStorage.getItem("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers,
      body: formData,
    });

    return response.json();
  },

  // DELETE request
  delete: async (endpoint, auth = false) => {
    const headers = {
      "Content-Type": "application/json",
    };

    if (auth) {
      const token = localStorage.getItem("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers,
    });

    return response.json();
  },
};

// Toast Notification
function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = `toast ${type} show`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Modal Functions
function showModal(modalId) {
  document.getElementById(modalId).classList.add("show");
  document.body.style.overflow = "hidden";
}

function hideModal(modalId) {
  document.getElementById(modalId).classList.remove("show");
  document.body.style.overflow = "";
}

function switchModal(from, to) {
  hideModal(from);
  setTimeout(() => showModal(to), 200);
}

// Get initials from name
function getInitials(name) {
  if (!name) return "?";
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name[0].toUpperCase();
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Vừa xong";
  if (minutes < 60) return `${minutes} phút trước`;
  if (hours < 24) return `${hours} giờ trước`;
  if (days < 7) return `${days} ngày trước`;

  return date.toLocaleDateString("vi-VN");
}

// Get image URL (handle both relative and absolute paths)
function getImageUrl(path) {
  if (!path) return "https://via.placeholder.com/300x400?text=No+Image";
  if (path.startsWith("http")) return path;
  return `${window.location.origin}${path}`;
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.classList.remove("show");
    document.body.style.overflow = "";
  }
});
