document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('.register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
        
            const nombre = document.getElementById('nombre').value.trim();
            const apellido = document.getElementById('apellido').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
        
            if (!nombre || !apellido || !email || !password || !confirmPassword) {
                alert('Por favor complete todos los campos');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor ingrese un correo electrónico válido');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }
            
            if (password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres');
                return;
            }
            
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            if (users.some(user => user.email === email)) {
                alert('Este correo electrónico ya está registrado');
                return;
            }
            
            const newUser = {
                id: generateUserId(),
                nombre: nombre,
                apellido: apellido,
                email: email,
                password: password,
                registrationDate: new Date().toISOString()
            };
            
            users.push(newUser);
            
            localStorage.setItem('users', JSON.stringify(users));
            
            const userSession = {
                id: newUser.id,
                name: newUser.nombre,
                lastName: newUser.apellido,
                email: newUser.email,
                isLoggedIn: true,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('currentUser', JSON.stringify(userSession));
            
            alert('¡Registro exitoso! Serás redirigido al inicio');
            window.location.href = 'index.html';
        });
    }
    
    function generateUserId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
    
    function checkLoginStatus() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (currentUser && currentUser.isLoggedIn) {
            window.location.href = 'index.html';
        }
    }
    
    checkLoginStatus();
});