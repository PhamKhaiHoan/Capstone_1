// Auth State Management
let currentUser = null;

// Check auth status on page load
document.addEventListener("DOMContentLoaded", () => {
  checkAuthStatus();
});

// Check if user is logged in
function checkAuthStatus() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    currentUser = JSON.parse(user);
    updateUIForLoggedInUser();
  } else {
    updateUIForGuest();
  }
}

// Update UI for logged in user
function updateUIForLoggedInUser() {
  const authButtons = document.getElementById("authButtons");
  const userMenu = document.getElementById("userMenu");

  if (authButtons) authButtons.style.display = "none";
  if (userMenu) userMenu.style.display = "flex";
}

// Update UI for guest
function updateUIForGuest() {
  const authButtons = document.getElementById("authButtons");
  const userMenu = document.getElementById("userMenu");

  if (authButtons) authButtons.style.display = "flex";
  if (userMenu) userMenu.style.display = "none";
}

// Handle Login
async function handleLogin(event) {
  event.preventDefault();

  const form = event.target;
  const email = form.email.value;
  const mat_khau = form.mat_khau.value;

  try {
    const result = await api.post("/auth/login", { email, mat_khau });

    if (result.statusCode === 200) {
      localStorage.setItem("token", result.content.token);
      localStorage.setItem("user", JSON.stringify(result.content.user));
      currentUser = result.content.user;

      hideModal("loginModal");
      updateUIForLoggedInUser();
      showToast("Đăng nhập thành công!", "success");

      // Reload page to update content
      setTimeout(() => location.reload(), 500);
    } else {
      showToast(result.message || "Đăng nhập thất bại!", "error");
    }
  } catch (error) {
    showToast("Có lỗi xảy ra!", "error");
    console.error(error);
  }
}

// Handle Signup
async function handleSignup(event) {
  event.preventDefault();

  const form = event.target;
  const data = {
    email: form.email.value,
    mat_khau: form.mat_khau.value,
    ho_ten: form.ho_ten.value,
    tuoi: form.tuoi.value ? parseInt(form.tuoi.value) : null,
  };

  try {
    const result = await api.post("/auth/signup", data);

    if (result.statusCode === 201) {
      hideModal("signupModal");
      showToast("Đăng ký thành công! Vui lòng đăng nhập.", "success");
      setTimeout(() => showModal("loginModal"), 500);
    } else {
      showToast(result.message || "Đăng ký thất bại!", "error");
    }
  } catch (error) {
    showToast("Có lỗi xảy ra!", "error");
    console.error(error);
  }
}

// Logout
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  currentUser = null;
  updateUIForGuest();
  showToast("Đã đăng xuất!", "success");

  // Redirect to home if on protected page
  if (
    window.location.pathname.includes("profile") ||
    window.location.pathname.includes("upload")
  ) {
    window.location.href = "index.html";
  } else {
    location.reload();
  }
}

// Check if user is logged in (for protected pages)
function requireAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    showToast("Vui lòng đăng nhập để tiếp tục!", "error");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
    return false;
  }
  return true;
}

// Get current user
function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// Check if logged in
function isLoggedIn() {
  return !!localStorage.getItem("token");
}
