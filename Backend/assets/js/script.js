function toggleForm(formType) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('signup-form');
    
    if (formType === 'login') {
      loginForm.style.display = 'block'; // إظهار نموذج تسجيل الدخول
      registerForm.style.display = 'none'; // إخفاء نموذج التسجيل
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}