// Authentication functionality for Al-Khorasani Store

document.addEventListener('DOMContentLoaded', function() {
    initAuthForms();
    initPasswordToggle();
    checkAuthStatus();
});

// Initialize authentication forms
function initAuthForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rememberMe = formData.get('remember-me');
    
    // Clear previous errors
    clearErrors();
    
    // Validate form
    if (!validateLoginForm(email, password)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'جاري تسجيل الدخول...';
    submitBtn.disabled = true;
    
    // Simulate login process
    setTimeout(() => {
        // Check credentials (demo purposes)
        if (isValidCredentials(email, password)) {
            // Save user data
            const userData = {
                email: email,
                name: getNameFromEmail(email),
                loginTime: new Date().toISOString(),
                rememberMe: !!rememberMe
            };
            
            localStorage.setItem('alkhorasani_user', JSON.stringify(userData));
            
            showNotification('تم تسجيل الدخول بنجاح!', 'success');
            
            // Redirect after success
            setTimeout(() => {
                const returnUrl = new URLSearchParams(window.location.search).get('return') || '../index.html';
                window.location.href = returnUrl;
            }, 1500);
        } else {
            showError('email', 'البريد الإلكتروني أو كلمة المرور غير صحيحة');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }, 2000);
}

// Handle register form submission
function handleRegister(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');
    const agreeTerms = formData.get('agree-terms');
    
    // Clear previous errors
    clearErrors();
    
    // Validate form
    if (!validateRegisterForm(name, email, phone, password, confirmPassword, agreeTerms)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'جاري إنشاء الحساب...';
    submitBtn.disabled = true;
    
    // Simulate registration process
    setTimeout(() => {
        // Check if email already exists
        if (isEmailExists(email)) {
            showError('email', 'هذا البريد الإلكتروني مستخدم بالفعل');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }
        
        // Save user data
        const userData = {
            name: name,
            email: email,
            phone: phone,
            registrationDate: new Date().toISOString()
        };
        
        // Save to localStorage (in real app, this would be sent to server)
        localStorage.setItem('alkhorasani_user', JSON.stringify(userData));
        localStorage.setItem('alkhorasani_registered_users', JSON.stringify([
            ...(JSON.parse(localStorage.getItem('alkhorasani_registered_users')) || []),
            userData
        ]));
        
        showNotification('تم إنشاء الحساب بنجاح!', 'success');
        
        // Redirect to login or home
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1500);
    }, 2000);
}

// Validate login form
function validateLoginForm(email, password) {
    let isValid = true;
    
    if (!email || !isValidEmail(email)) {
        showError('email', 'يرجى إدخال بريد إلكتروني صحيح');
        isValid = false;
    }
    
    if (!password || password.length < 6) {
        showError('password', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        isValid = false;
    }
    
    return isValid;
}

// Validate register form
function validateRegisterForm(name, email, phone, password, confirmPassword, agreeTerms) {
    let isValid = true;
    
    if (!name || name.trim().length < 2) {
        showError('name', 'يرجى إدخال اسم صحيح (حرفين على الأقل)');
        isValid = false;
    }
    
    if (!email || !isValidEmail(email)) {
        showError('email', 'يرجى إدخال بريد إلكتروني صحيح');
        isValid = false;
    }
    
    if (!phone || !isValidYemeniPhone(phone)) {
        showError('phone', 'يرجى إدخال رقم هاتف يمني صحيح');
        isValid = false;
    }
    
    if (!password || password.length < 8) {
        showError('password', 'كلمة المرور يجب أن تكون 8 أحرف على الأقل');
        isValid = false;
    } else if (!isStrongPassword(password)) {
        showError('password', 'كلمة المرور يجب أن تحتوي على أحرف وأرقام');
        isValid = false;
    }
    
    if (password !== confirmPassword) {
        showError('confirm-password', 'كلمة المرور غير متطابقة');
        isValid = false;
    }
    
    if (!agreeTerms) {
        showError('agree-terms', 'يجب الموافقة على الشروط والأحكام');
        isValid = false;
    }
    
    return isValid;
}

// Validation helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidYemeniPhone(phone) {
    // Yemeni phone number patterns
    const phoneRegex = /^(\+967|967|0)?(7[0-9]{8}|1[0-9]{6})$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function isStrongPassword(password) {
    // At least one letter and one number
    return /^(?=.*[A-Za-z])(?=.*\d)/.test(password);
}

// Authentication helper functions
function isValidCredentials(email, password) {
    // Demo credentials - in real app, this would check against server
    const demoUsers = [
        { email: 'admin@alkhorasani.com', password: '123456' },
        { email: 'customer@example.com', password: 'password123' }
    ];
    
    return demoUsers.some(user => user.email === email && user.password === password);
}

function isEmailExists(email) {
    const registeredUsers = JSON.parse(localStorage.getItem('alkhorasani_registered_users')) || [];
    return registeredUsers.some(user => user.email === email);
}

function getNameFromEmail(email) {
    return email.split('@')[0].replace(/[^a-zA-Z]/g, '');
}

// Error handling
function showError(fieldName, message) {
    const errorElement = document.getElementById(fieldName + '-error');
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    if (inputElement) {
        inputElement.classList.add('error');
        inputElement.addEventListener('input', function() {
            this.classList.remove('error');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        }, { once: true });
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputElements = document.querySelectorAll('.form-group input');
    
    errorElements.forEach(el => {
        el.style.display = 'none';
        el.textContent = '';
    });
    
    inputElements.forEach(el => {
        el.classList.remove('error');
    });
}

// Password toggle functionality
function initPasswordToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    });
}

// Check authentication status
function checkAuthStatus() {
    const user = JSON.parse(localStorage.getItem('alkhorasani_user'));
    
    if (user) {
        // Update navigation for logged-in user
        updateNavForLoggedInUser(user);
    }
}

function updateNavForLoggedInUser(user) {
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn && !window.location.pathname.includes('login.html')) {
        loginBtn.textContent = `مرحباً ${user.name}`;
        loginBtn.href = '#';
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showUserMenu();
        });
    }
}

function showUserMenu() {
    if (confirm('هل تريد تسجيل الخروج؟')) {
        logout();
    }
}

function logout() {
    localStorage.removeItem('alkhorasani_user');
    showNotification('تم تسجيل الخروج بنجاح', 'success');
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1000);
}

// Add authentication styles
const authStyles = `
    .auth-section {
        min-height: 100vh;
        display: flex;
        align-items: center;
        background: #F8F9FA;
        padding: 100px 0 50px;
    }
    
    .auth-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        max-width: 1000px;
        margin: 0 auto;
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    }
    
    .auth-form-container {
        padding: 3rem;
    }
    
    .auth-header {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .auth-header h1 {
        color: #2D5016;
        margin-bottom: 0.5rem;
    }
    
    .auth-header p {
        color: #666;
        margin-bottom: 0;
    }
    
    .form-group {
        margin-bottom: 1.5rem;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        color: #333;
        font-weight: 500;
    }
    
    .form-group input {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid #ddd;
        border-radius: 8px;
        font-family: 'Tajawal', sans-serif;
        transition: border-color 0.3s ease;
    }
    
    .form-group input:focus {
        outline: none;
        border-color: #2D5016;
    }
    
    .form-group input.error {
        border-color: #dc3545;
    }
    
    .password-input {
        position: relative;
    }
    
    .toggle-password {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
    }
    
    .error-message {
        display: none;
        color: #dc3545;
        font-size: 0.9rem;
        margin-top: 0.25rem;
    }
    
    .form-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }
    
    .checkbox-container {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 0.9rem;
    }
    
    .checkbox-container input {
        margin-left: 0.5rem;
    }
    
    .forgot-password {
        color: #2D5016;
        text-decoration: none;
        font-size: 0.9rem;
    }
    
    .forgot-password:hover {
        text-decoration: underline;
    }
    
    .btn-full {
        width: 100%;
        margin-bottom: 1rem;
    }
    
    .auth-divider {
        text-align: center;
        margin: 1.5rem 0;
        position: relative;
    }
    
    .auth-divider::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background: #ddd;
    }
    
    .auth-divider span {
        background: white;
        padding: 0 1rem;
        color: #666;
    }
    
    .social-login {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }
    
    .btn-social {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        background: white;
        border: 2px solid #ddd;
        color: #333;
    }
    
    .btn-social:hover {
        border-color: #2D5016;
    }
    
    .social-icon {
        font-weight: bold;
        font-size: 1.2rem;
    }
    
    .btn-google .social-icon {
        color: #db4437;
    }
    
    .btn-facebook .social-icon {
        color: #4267B2;
    }
    
    .auth-footer {
        text-align: center;
    }
    
    .auth-footer a {
        color: #2D5016;
        text-decoration: none;
        font-weight: 500;
    }
    
    .auth-footer a:hover {
        text-decoration: underline;
    }
    
    .auth-image {
        position: relative;
        background: #2D5016;
    }
    
    .auth-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.3;
    }
    
    .auth-image-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: white;
        padding: 2rem;
    }
    
    .auth-image-overlay h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: #D4AF37;
    }
    
    .auth-image-overlay p {
        font-size: 1.1rem;
        line-height: 1.6;
    }
    
    @media (max-width: 768px) {
        .auth-container {
            grid-template-columns: 1fr;
            margin: 1rem;
        }
        
        .auth-form-container {
            padding: 2rem;
        }
        
        .auth-image {
            order: -1;
            min-height: 200px;
        }
        
        .social-login {
            flex-direction: column;
        }
        
        .form-options {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
        }
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = authStyles;
document.head.appendChild(styleSheet);

