/*
 * FILE: script.js
 * MÔ TẢ: JavaScript cho website xem phim MovieFlix
 * Chức năng: Navigation, Movie interactions, Form validation, Toast notifications
 */

// ===== NAVIGATION SCROLL EFFECT =====
/**
 * Thêm hiệu ứng khi scroll cho navigation
 */
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE NAVIGATION TOGGLE =====
/**
 * Xử lý toggle menu mobile
 */
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animation cho hamburger icon
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (navMenu.classList.contains('active')) {
                bar.style.transform = index === 0 ? 'rotate(45deg) translate(5px, 5px)' :
                                index === 1 ? 'opacity(0)' :
                                'rotate(-45deg) translate(7px, -6px)';
            } else {
                bar.style.transform = 'none';
            }
        });
    });
}

// ===== MOVIE INTERACTIONS =====
/**
 * Xử lý tương tác với thẻ phim (like, bookmark, play)
 */
function setupMovieInteractions() {
    const movieCards = document.querySelectorAll('.movie-card');
    
    movieCards.forEach(card => {
        // Play button
        const playBtn = card.querySelector('.play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const movieTitle = card.querySelector('.movie-title').textContent;
                showToast(`Đang phát: ${movieTitle}`, 'success');
                
                // Ở đây sẽ tích hợp với video player
                simulateVideoPlayback(movieTitle);
            });
        }
        
        // Like button
        const likeBtn = card.querySelector('.action-btn:nth-child(1)');
        if (likeBtn) {
            likeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const icon = this.querySelector('i');
                const movieTitle = card.querySelector('.movie-title').textContent;
                
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    icon.style.color = '#e50914';
                    showToast(`Đã thêm "${movieTitle}" vào danh sách yêu thích`, 'success');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.style.color = '';
                    showToast(`Đã xóa "${movieTitle}" khỏi danh sách yêu thích`, 'warning');
                }
            });
        }
        
        // Bookmark button
        const bookmarkBtn = card.querySelector('.action-btn:nth-child(2)');
        if (bookmarkBtn) {
            bookmarkBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const icon = this.querySelector('i');
                const movieTitle = card.querySelector('.movie-title').textContent;
                
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    icon.style.color = '#f5c518';
                    showToast(`Đã lưu "${movieTitle}" để xem sau`, 'success');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.style.color = '';
                    showToast(`Đã bỏ lưu "${movieTitle}"`, 'warning');
                }
            });
        }
        
        // Click trên card để xem chi tiết
        card.addEventListener('click', function() {
            const movieTitle = this.querySelector('.movie-title').textContent;
            showToast(`Đang tải trang chi tiết: ${movieTitle}`, 'info');
            // Ở đây sẽ chuyển hướng đến trang chi tiết phim
        });
    });
}

// ===== SIMULATE VIDEO PLAYBACK =====
/**
 * Giả lập phát video (trong thực tế sẽ tích hợp video player)
 */
function simulateVideoPlayback(movieTitle) {
    // Tạo modal phát video
    const videoModal = document.createElement('div');
    videoModal.className = 'video-modal';
    videoModal.innerHTML = `
        <div class="video-modal-content">
            <div class="video-header">
                <h3>${movieTitle}</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="video-placeholder">
                <i class="fas fa-play-circle"></i>
                <p>Video Player - ${movieTitle}</p>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
            </div>
            <div class="video-controls">
                <button class="btn btn-primary">
                    <i class="fas fa-play"></i>
                    Tiếp tục phát
                </button>
                <button class="btn btn-secondary">
                    <i class="fas fa-info-circle"></i>
                    Chi tiết phim
                </button>
            </div>
        </div>
    `;
    
    // Thêm style cho modal
    const style = document.createElement('style');
    style.textContent = `
        .video-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            backdrop-filter: blur(10px);
        }
        .video-modal-content {
            background: #141414;
            border-radius: 15px;
            padding: 30px;
            max-width: 600px;
            width: 90%;
            border: 1px solid #333;
        }
        .video-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .video-header h3 {
            color: white;
            margin: 0;
        }
        .close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
        }
        .video-placeholder {
            background: #000;
            height: 300px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            margin-bottom: 20px;
        }
        .video-placeholder i {
            font-size: 64px;
            color: #e50914;
            margin-bottom: 15px;
        }
        .loading-bar {
            width: 80%;
            height: 4px;
            background: #333;
            border-radius: 2px;
            margin-top: 20px;
            overflow: hidden;
        }
        .loading-progress {
            height: 100%;
            background: #e50914;
            width: 0%;
            animation: loading 3s linear infinite;
        }
        @keyframes loading {
            0% { width: 0%; }
            100% { width: 100%; }
        }
        .video-controls {
            display: flex;
            gap: 15px;
            justify-content: center;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(videoModal);
    
    // Xử lý đóng modal
    const closeBtn = videoModal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(videoModal);
        document.head.removeChild(style);
    });
    
    // Tự động đóng sau 5 giây (giả lập)
    setTimeout(() => {
        if (document.body.contains(videoModal)) {
            document.body.removeChild(videoModal);
            document.head.removeChild(style);
            showToast('Đã hoàn thành xem thử!', 'success');
        }
    }, 5000);
}

// ===== SEARCH FUNCTIONALITY =====
/**
 * Xử lý tìm kiếm phim
 */
function setupSearch() {
    const searchInput = document.querySelector('.nav-search input');
    const searchBtn = document.querySelector('.nav-search button');
    
    if (searchInput && searchBtn) {
        const performSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                showToast(`Đang tìm kiếm: "${query}"`, 'info');
                // Ở đây sẽ tích hợp với search API
                simulateSearch(query);
            }
        };
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// ===== SIMULATE SEARCH =====
/**
 * Giả lập tìm kiếm phim
 */
function simulateSearch(query) {
    // Trong thực tế sẽ gọi API và hiển thị kết quả
    const movies = document.querySelectorAll('.movie-card');
    let found = false;
    
    movies.forEach(movie => {
        const title = movie.querySelector('.movie-title').textContent.toLowerCase();
        if (title.includes(query.toLowerCase())) {
            movie.scrollIntoView({ behavior: 'smooth', block: 'center' });
            movie.style.animation = 'highlight 2s ease';
            found = true;
        }
    });
    
    if (!found) {
        showToast(`Không tìm thấy phim với từ khóa: "${query}"`, 'warning');
    }
    
    // Thêm animation highlight
    const style = document.createElement('style');
    style.textContent = `
        @keyframes highlight {
            0% { box-shadow: 0 0 0 0 rgba(229, 9, 20, 0.7); }
            50% { box-shadow: 0 0 0 10px rgba(229, 9, 20, 0); }
            100% { box-shadow: 0 0 0 0 rgba(229, 9, 20, 0); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.head.removeChild(style);
    }, 2000);
}

// ===== PASSWORD TOGGLE VISIBILITY =====
/**
 * Cho phép hiển thị/ẩn mật khẩu
 */
function setupPasswordToggle() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
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
 * Hiển thị độ mạnh mật khẩu
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
            
            // Đánh giá độ mạnh mật khẩu
            if (password.length >= 8) strength += 25;
            if (/[A-Z]/.test(password)) strength += 25;
            if (/[0-9]/.test(password)) strength += 25;
            if (/[^A-Za-z0-9]/.test(password)) strength += 25;
            
            // Cập nhật giao diện
            strengthBar.style.setProperty('--strength', `${strength}%`);
            
            if (strength < 50) {
                color = '#dc3545';
                text = 'Yếu';
            } else if (strength < 75) {
                color = '#ffc107';
                text = 'Trung bình';
            } else {
                color = '#28a745';
                text = 'Mạnh';
            }
            
            strengthBar.style.backgroundColor = color;
            strengthText.textContent = `Độ mạnh mật khẩu: ${text}`;
            strengthText.style.color = color;
        });
    }
}

// ===== TOAST NOTIFICATION SYSTEM =====
/**
 * Hiển thị thông báo toast
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = 'toast';
    
    // Thiết lập màu theo loại thông báo
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    
    toast.style.backgroundColor = colors[type] || colors.success;
    toast.classList.add('show');
    
    // Tự động ẩn sau 3 giây
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== FORM VALIDATION AND SUBMISSION =====
/**
 * Xử lý form đăng nhập và đăng ký
 */
function setupFormHandlers() {
    // Form đăng nhập
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (!email || !password) {
                showToast('Vui lòng điền đầy đủ thông tin!', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showToast('Email không hợp lệ!', 'error');
                return;
            }
            
            // Giả lập đăng nhập thành công
            showToast('Đăng nhập thành công!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }
    
    // Form đăng ký
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const terms = document.querySelector('input[name="terms"]').checked;
            
            if (!fullname || !email || !password || !confirmPassword) {
                showToast('Vui lòng điền đầy đủ thông tin!', 'error');
                return;
            }
            
            if (!terms) {
                showToast('Vui lòng đồng ý với điều khoản dịch vụ!', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showToast('Email không hợp lệ!', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showToast('Mật khẩu xác nhận không khớp!', 'error');
                return;
            }
            
            if (password.length < 6) {
                showToast('Mật khẩu phải có ít nhất 6 ký tự!', 'error');
                return;
            }
            
            // Giả lập đăng ký thành công
            showToast('Đăng ký thành công! Chào mừng đến với MovieFlix!', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }
}

// ===== EMAIL VALIDATION =====
/**
 * Kiểm tra định dạng email
 */
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ===== SOCIAL LOGIN HANDLERS =====
/**
 * Xử lý đăng nhập bằng mạng xã hội
 */
function setupSocialLogin() {
    const googleButtons = document.querySelectorAll('.btn-google');
    const facebookButtons = document.querySelectorAll('.btn-facebook');
    
    googleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            showToast('Đang kết nối với Google...', 'info');
            // Tích hợp Google OAuth
        });
    });
    
    facebookButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            showToast('Đang kết nối với Facebook...', 'info');
            // Tích hợp Facebook OAuth
        });
    });
}

// ===== INITIALIZATION =====
/**
 * Khởi tạo toàn bộ chức năng khi DOM ready
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 MovieFlix đang khởi động...');
    
    // Khởi tạo các chức năng
    setupMovieInteractions();   // Tương tác với thẻ phim
    setupSearch();              // Tìm kiếm phim
    setupPasswordToggle();      // Toggle mật khẩu
    setupPasswordStrength();    // Độ mạnh mật khẩu
    setupFormHandlers();        // Xử lý form
    setupSocialLogin();        // Đăng nhập MXH
    
    // Active navigation link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    console.log('✅ MovieFlix đã sẵn sàng!');
});

// ===== CLOSE MOBILE MENU ON LINK CLICK =====
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-link') && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// ===== ENHANCE USER EXPERIENCE =====
/**
 * Cải thiện trải nghiệm người dùng với các hiệu ứng
 */
document.addEventListener('DOMContentLoaded', function() {
    // Thêm hiệu ứng loading cho images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
    
    // Smooth scroll cho internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});