import { loadNavbar } from "./navbar.js";
import { sayacPage } from "./sayaccontent.js";
import { kitapPage } from "./kitapcontent.js";

// HomePage bileşeni
export const HomePage = () => {
    const root = document.getElementById('root');
    root.innerHTML = '';
    loadNavbar();
    let container = document.createElement('div');
    container.id = 'Home';
    container.innerHTML = `
    <div class="container">
        <div class="jumbotron jumbotron-custom">
            <h1 class="display-4">Hoşgeldiniz Kitaplık!</h1>
            <p class="lead">Kitap koleksiyonunuzu yönetmek ve yeni kitaplar keşfetmek için hoş geldiniz. Lütfen üst menüden seçim yaparak devam edin.</p>
        </div>
    </div>
    `;
    root.appendChild(container);
};

// Dinamik sayfa yükleyici
export const loadPage = (page) => {
    switch (page) {
        case 'home':
            HomePage();
            break;
        case 'sayac':
            sayacPage();
            break;
        case 'kitap':
            kitapPage();
            break;
        default:
            HomePage(); // Varsayılan olarak ana sayfa yüklensin
    }
};

// URL parametresine göre sayfa yüklemesi
const page = new URLSearchParams(window.location.search).get('page') || 'home';
loadPage(page);
