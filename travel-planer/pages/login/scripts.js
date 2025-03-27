document.getElementById('login-tab').addEventListener('click', function() {
    document.getElementById('login-tab').classList.add('active');
    document.getElementById('signup-tab').classList.remove('active');
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
});

document.getElementById('signup-tab').addEventListener('click', function() {
    document.getElementById('signup-tab').classList.add('active');
    document.getElementById('login-tab').classList.remove('active');
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
});

// Link functionality
document.getElementById('show-signup').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('signup-tab').click();
});

document.getElementById('show-login').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('login-tab').click();
});

// Form submission
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Энд серверт хүсэлт илгээх код бичигдэнэ
    console.log('Нэвтрэх оролдлого:', { email, password });
    alert('Нэвтрэх хүсэлт илгээгдлээ!');
});

document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    
    if (password !== confirm) {
        alert('Нууц үгнүүд таарахгүй байна!');
        return;
    }
    
    // Энд серверт хүсэлт илгээх код бичигдэнэ
    console.log('Бүртгүүлэх оролдлого:', { name, email, password });
    alert('Бүртгүүлэх хүсэлт илгээгдлээ!');
});