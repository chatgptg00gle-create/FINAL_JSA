/*
 * FILE: script.js
 * MÔ TẢ: File JavaScript chứa toàn bộ logic và tương tác cho website
 * Bao gồm: Navigation toggle, Form validation, Password strength, Toast notifications
 */

// ===== MOBILE NAVIGATION TOGGLE =====
/**
 * Xử lý toggle menu mobile khi click vào hamburger icon
 */
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Thêm hiệu ứng animation cho hamburger icon
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.toggle('active'));
    });
}

// ===== PASSWORD TOGGLE VISIBILITY =====
/**
 * Cho phép người dùng hiển thị/ẩn mật khẩu khi click vào icon eye
 */
function setupPasswordToggle() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            // Chuyển đổi giữa hiển thị và ẩn mật khẩu
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// ===== PASSWORD STRENGTH INDICATOR =====
/**
 * Hiển thị độ mạnh của mật khẩu khi người dùng nhập
 * Đánh giá dựa trên: độ dài, chữ hoa, số, ký tự đặc biệt
 */
function setupPasswordStrength() {
    const passwordInput = document.getElementById('reg-password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (passwordInput && strengthBar) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            let color = '';
            let text = '';
            
            // Kiểm tra độ dài mật khẩu (tối thiểu 8 ký tự)
            if (password.length >= 8) strength += 25;
            
            // Kiểm tra có chữ hoa không
            if (/[A-Z]/.test(password)) strength += 25;
            
            // Kiểm tra có số không
            if (/[0-9]/.test(password)) strength += 25;
            
            // Kiểm tra có ký tự đặc biệt không
            if (/[^A-Za-z0-9]/.test(password)) strength += 25;
            
            // Cập nhật thanh độ mạnh
            strengthBar.style.setProperty('--strength', `${strength}%`);
            
            // Xác định màu và text hiển thị dựa trên độ mạnh
            if (strength < 50) {
                color = '#dc3545'; // Đỏ - Yếu
                text = 'Yếu';
            } else if (strength < 75) {
                color = '#ffc107'; // Vàng - Trung bình
                text = 'Trung bình';
            } else {
                color = '#28a745'; // Xanh - Mạnh
                text = 'Mạnh';
            }
            
            // Áp dụng style
            strengthBar.style.backgroundColor = color;
            strengthText.textContent = `Độ mạnh mật khẩu: ${text}`;
            strengthText.style.color = color;
        });
    }
}

// ===== TOAST NOTIFICATION SYSTEM =====
/**
 * Hiển thị thông báo toast cho người dùng
 * @param {string} message - Nội dung thông báo
 * @param {string} type - Loại thông báo: 'success', 'error', 'warning'
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    // Thiết lập nội dung và style dựa trên loại thông báo
    toast.textContent = message;
    toast.className = 'toast';
    
    if (type === 'error') {
        toast.style.backgroundColor = '#dc3545'; // Đỏ cho lỗi
    } else if (type === 'warning') {
        toast.style.backgroundColor = '#ffc107'; // Vàng cho cảnh báo
        toast.style.color = '#333';
    } else {
        toast.style.backgroundColor = '#28a745'; // Xanh cho thành công
    }
    
    // Hiển thị toast
    toast.classList.add('show');
    
    // Tự động ẩn sau 3 giây
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== FORM VALIDATION AND SUBMISSION =====
/**
 * Thiết lập xử lý cho form đăng nhập và đăng ký
 * Bao gồm validation và xử lý submit
 */
function setupFormHandlers() {
    // ===== LOGIN FORM HANDLER =====
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Lấy giá trị từ form
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Validation cơ bản
            if (!email || !password) {
                showToast('Vui lòng điền đầy đủ thông tin!', 'error');
                return;
            }
            
            // Validation email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Email không hợp lệ!', 'error');
                return;
            }
            
            // Giả lập quá trình đăng nhập
            showToast('Đăng nhập thành công! Đang chuyển hướng...');
            
            // Chuyển hướng về trang chủ sau khi đăng nhập thành công
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }
    
    // ===== REGISTER FORM HANDLER =====
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Lấy giá trị từ form
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const terms = document.querySelector('input[name="terms"]').checked;
            
            // Validation: Kiểm tra các trường bắt buộc
            if (!fullname || !email || !password || !confirmPassword) {
                showToast('Vui lòng điền đầy đủ thông tin!', 'error');
                return;
            }
            
            // Validation: Kiểm tra đã đồng ý điều khoản chưa
            if (!terms) {
                showToast('Vui lòng đồng ý với điều khoản dịch vụ!', 'error');
                return;
            }
            
            // Validation: Kiểm tra mật khẩu xác nhận
            if (password !== confirmPassword) {
                showToast('Mật khẩu xác nhận không khớp!', 'error');
                return;
            }
            
            // Validation: Kiểm tra độ dài mật khẩu
            if (password.length < 6) {
                showToast('Mật khẩu phải có ít nhất 6 ký tự!', 'error');
                return;
            }
            
            // Validation: Kiểm tra định dạng email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Email không hợp lệ!', 'error');
                return;
            }
            
            // Giả lập quá trình đăng ký
            showToast('Đăng ký thành công! Đang chuyển hướng...');
            
            // Chuyển hướng về trang đăng nhập sau khi đăng ký thành công
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }
}

// ===== SOCIAL LOGIN HANDLERS =====
/**
 * Xử lý đăng nhập bằng mạng xã hội (Google, Facebook)
 */
function setupSocialLogin() {
    const googleButtons = document.querySelectorAll('.btn-google');
    const facebookButtons = document.querySelectorAll('.btn-facebook');
    
    // Xử lý đăng nhập Google
    googleButtons.forEach(button => {
        button.addEventListener('click', function() {
            showToast('Đang kết nối với Google...', 'warning');
            // Ở đây sẽ tích hợp với Google OAuth API
        });
    });
    
    // Xử lý đăng nhập Facebook
    facebookButtons.forEach(button => {
        button.addEventListener('click', function() {
            showToast('Đang kết nối với Facebook...', 'warning');
            // Ở đây sẽ tích hợp với Facebook OAuth API
        });
    });
}

// ===== INITIALIZATION =====
/**
 * Khởi tạo toàn bộ chức năng khi DOM đã load xong
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Khởi tạo website...');
    
    // Khởi tạo các chức năng
    setupPasswordToggle();      // Toggle hiển thị mật khẩu
    setupPasswordStrength();    // Hiển thị độ mạnh mật khẩu
    setupFormHandlers();        // Xử lý form đăng nhập/đăng ký
    setupSocialLogin();         // Xử lý đăng nhập mạng xã hội
    
    // Thêm class active cho trang hiện tại trong navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    console.log('✅ Website đã khởi tạo thành công!');
});

// ===== CLOSE MOBILE MENU WHEN CLICKING ON LINK =====
/**
 * Đóng menu mobile khi click vào link (cho trải nghiệm mobile tốt hơn)
 */
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-link') && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// ===== ENHANCE FORM UX =====
/**
 * Thêm hiệu ứng focus cho input fields để cải thiện trải nghiệm người dùng
 */
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        // Thêm hiệu ứng khi focus
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        // Xóa hiệu ứng khi blur
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});