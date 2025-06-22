/**
 * Script para manejar la sesión del usuario en todas las páginas
 */
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    
    function checkLoginStatus() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (currentUser && currentUser.isLoggedIn) {
            updateUserInterface(currentUser);
        }
    }
    
    function updateUserInterface(user) {
        const userActionsElement = document.querySelector('.user-actions');
        
        if (userActionsElement) {
            let dropdownElement = userActionsElement.querySelector('.dropdown');
            
            if (!dropdownElement) {
                const loginElement = userActionsElement.querySelector('.login');
                
                if (loginElement) {
                    const dropdownHtml = `
                        <div class="dropdown">
                            <a href="#" class="login">
                                <i class="fa-solid fa-user"></i>
                                <span>${user.name}</span>
                            </a>
                            <div class="dropdown-content">
                                <a href="perfil.html">Mi perfil</a>
                                <a href="#" id="logout-btn">Cerrar sesión</a>
                            </div>
                        </div>
                    `;
                    
                    loginElement.outerHTML = dropdownHtml;
                }
            } else {
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
            }
            
            setTimeout(() => {
                const logoutBtn = document.getElementById('logout-btn');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        localStorage.removeItem('currentUser');
                        window.location.href = 'index.html';
                    });
                }
            }, 100);
        }
    }
});
