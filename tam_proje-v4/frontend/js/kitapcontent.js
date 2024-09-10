import {
    loadNavbar
} from "./navbar.js";
import BooksAction from "./app2.js";

export const kitapPage = () => {
    // Mevcut kitapPage fonksiyonu burada kalıyor
    const root = document.getElementById('root');
    root.innerHTML = '';
    loadNavbar();

    let booksContainer = document.createElement('div');
    booksContainer.innerHTML = `
    <div>
        <div class="container mt-5">
            <h1 class="text-center">Kitap Yönetim Sistemi</h1>
            <div class="text-right mb-3">
                <button class="btn btn-success" data-toggle="modal" data-target="#createBookModal">Yeni Kitap
                    Ekle</button>
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Başlık</th>
                        <th>Fiyat</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody id="booksTableBody">
                    <!-- Kitaplar burada listelenecek -->
                </tbody>
            </table>
        </div>

        <!-- Yeni Kitap Modal -->
        <div class="modal fade" id="createBookModal" tabindex="-1" aria-labelledby="createBookModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="createBookModalLabel">Yeni Kitap Ekle</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="createBookForm">
                            <div class="form-group">
                                <label for="title">Başlık</label>
                                <input type="text" class="form-control" id="title" required>
                            </div>
                            <div class="form-group">
                                <label for="price">Fiyat</label>
                                <input type="number" class="form-control" id="price" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Ekle</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Güncelle Kitap Modal -->
        <div class="modal fade" id="updateBookModal" tabindex="-1" aria-labelledby="updateBookModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="updateBookModalLabel">Kitap Güncelle</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="updateBookForm">
                            <input type="hidden" id="updateBookId">
                            <div class="form-group">
                                <label for="updateTitle">Başlık</label>
                                <input type="text" class="form-control" id="updateTitle" required>
                            </div>
                            <div class="form-group">
                                <label for="updatePrice">Fiyat</label>
                                <input type="number" class="form-control" id="updatePrice" required>
                            </div>
                            <button type="submit" id='modalUpdate' class="btn btn-primary">Güncelle</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    root.appendChild(booksContainer);

    BooksAction();
};