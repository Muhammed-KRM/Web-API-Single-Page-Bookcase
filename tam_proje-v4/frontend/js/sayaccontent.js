import { loadNavbar } from "./navbar.js";
import SayacAction from "./app.js";

export const sayacPage = () => {
    const root = document.getElementById('root');
    root.innerHTML = '';
    loadNavbar();
    
    let sayacContainer = document.createElement('div');
    sayacContainer.innerHTML = `
    <div class="container mt-5">
        <h1 class="text-center mb-4">Sayaç Yönetimi</h1>
        <div class="mb-3">
            <label for="counterSelect" class="form-label">Sayaç Seç:</label>
            <select id="counterSelect" class="form-select">
                <option value="1">Sayaç 1</option>
                <option value="2">Sayaç 2</option>
                <option value="3">Sayaç 3</option>
                <option value="4">Sayaç 4</option>
                <option value="5">Sayaç 5</option>
                <option value="6">Sayaç 6</option>
                <option value="7">Sayaç 7</option>
                <option value="8">Sayaç 8</option>
            </select>
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-center mb-4">
            <button id="startButton" class="btn btn-success me-md-2">Başlat</button>
            <button id="stopButton" class="btn btn-danger">Durdur</button>
        </div>
        <div class="text-center">
            <span id="counterValue" class="fs-3 fw-bold">0</span>
        </div>
    </div>
    `;

    root.appendChild(sayacContainer);
    SayacAction();
};
