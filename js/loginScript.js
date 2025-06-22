document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            
            if (!username || !password) {
                alert('Por favor complete todos los campos');
                return;
            }
            
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            const user = users.find(u => 
                u.email === username || 
                (u.username && u.username === username)
            );
            
            if (user && user.password === password) {
               
                const userSession = {
                    id: user.id,
                    name: user.nombre,
                    lastName: user.apellido,
                    email: user.email,
                    isLoggedIn: true,
                    loginTime: new Date().toISOString()
                };
                
                localStorage.setItem('currentUser', JSON.stringify(userSession));
                
                alert('¡Inicio de sesión exitoso!');
                window.location.href = 'index.html';
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        });
    }
    
    function checkLoginStatus() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (currentUser && currentUser.isLoggedIn) {
            
            const userActions = document.querySelector('.user-actions');
            
            if (userActions) {
              
                updateUserInterface(currentUser);
            }
        }
    }
    
    function updateUserInterface(user) {
        const dropdownElement = document.querySelector('.dropdown');
        
        if (dropdownElement) {
          
            dropdownElement.innerHTML = `
                <a href="#" class="login">
                    <i class="fa-solid fa-user"></i>
                    <span>${user.name}</span>
                </a>
                <div class="dropdown-content">
                    <a href="perfil.html">Mi perfil</a>
                    <a href="#" id="logout-btn">Cerrar sesión</a>
                </div>
            `;
            
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    localStorage.removeItem('currentUser');
                    window.location.href = 'index.html';
                });
            }
        }
    }
    
    checkLoginStatus();
});