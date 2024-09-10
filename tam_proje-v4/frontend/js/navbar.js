import Auth from './auth.js'; // Varsayılan ihracatı ithal et

// Diğer importlar
import { kitapPage } from "./kitapcontent.js";
import { HomePage } from './content.js';
import { sayacPage } from './sayaccontent.js';

function loadNavbar() {
    const root = document.getElementById('root');
    const navbarContainer = document.createElement('nav');
    navbarContainer.id = 'navBar';
    root.insertBefore(navbarContainer, root.firstChild);

    if (Auth.isLoggedIn()) {
        navbarContainer.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-custom">
            <a class="navbar-brand" href="index.html">Kitaplık</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" id="Home">Anasayfa</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id='kitaplar'>Kitaplar</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id='Sayac'>Sayaç</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Hoşgeldin, ${Auth.getUserInfo().username}!</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" id="logoutLink">Çıkış Yap</a>
                    </li>
                </ul>
            </div>
        </nav>
    `;
        document.getElementById('kitaplar').addEventListener('click', (ev) => {
            ev.preventDefault();
            kitapPage();
        });
        document.getElementById('Home').addEventListener('click', (ev) => {
            ev.preventDefault();
            HomePage()
        });

        document.getElementById('Sayac').addEventListener('click', (ev) => {
            ev.preventDefault();
            sayacPage();
        });

        document.getElementById('logoutLink').addEventListener('click', (ev) => {
            ev.preventDefault();
            Auth.Logout();
            location.reload();
        });

    } else {
        navbarContainer.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-custom">
            <a class="navbar-brand" href="index.html">Kitaplık</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" id="Home">Anasayfa</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="login.html">Kitaplar</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="login.html">Sayaç</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="login.html">Giriş Yap</a>
                    </li>
                </ul>
            </div>
        </nav>
    `;

    document.getElementById('Home').addEventListener('click', (ev) => {
        ev.preventDefault();
        HomePage()
    });

    }

}

export {
    loadNavbar
};
