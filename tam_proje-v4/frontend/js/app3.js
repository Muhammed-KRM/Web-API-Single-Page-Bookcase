import Auth from './auth.js';  // Varsayılan ihracat olarak içe aktar

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    const errorDiv = document.getElementById('error');
    const loader = document.getElementById('loader_container');
    
    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        loader.style.display = 'block';
        
        try {
            const data = await Auth.Login(username, password);
            loader.style.display = 'none';
        
            if (data.username) {
                window.location.href = '/';
            } else {
                throw new Error('Şifre veya kullanıcı adı yanlış');
            }
        } catch (error) {
            loader.style.display = 'none';
            errorDiv.textContent = error.message || 'Şifre veya kullanıcı adı yanlış';
            errorDiv.classList.remove('d-none');
        }
    });
});
