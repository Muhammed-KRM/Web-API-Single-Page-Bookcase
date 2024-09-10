import BookItem from "./components/BookItem.js";

function BooksAction() {
    // Kullanıcı oturumu kontrolü
    if (!localStorage.getItem('user')) {
        window.location.href = 'login.html';
    }

    // Çıkış yap butonunu tanımla
    const logOutBtn = document.getElementById('LogOut');
    if (logOutBtn) {
        logOutBtn.addEventListener('click', logOutFunc);
    }

    // Kitapları yükle
    loadBooks();

    // Yeni kitap ekleme formunu tanımla
    const createBookForm = document.getElementById('createBookForm');
    if (createBookForm) {
        createBookForm.addEventListener('submit', function (event) {
            event.preventDefault();
            createBook();
        });
    }

    // Kitapları yükle
    async function loadBooks() {
        try {
            const response = await fetch('http://localhost:8088/api/books');
            const data = await response.json();
            const booksTableBody = document.getElementById('booksTableBody');
            booksTableBody.innerHTML = '';
            data.forEach(book => {
                BookItem(book).initialize();
            });
            BookItem().initEventListener(); // Silme işlemleri için event listener
            // UpdateBookItem().initEventListener(); // Güncelleme işlemleri için event listener
        } catch (error) {
            console.error('Error loading books:', error);
        }
    }

    // Yeni kitap ekle
    async function createBook() {
        const title = document.getElementById('title').value;
        const price = document.getElementById('price').value;

        try {
            const response = await fetch('http://localhost:8088/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    price: parseFloat(price)
                })
            });
            if (response.ok) {
                $('#createBookModal').modal('hide');
                loadBooks(); // Kitaplar yenilensin
            } else {
                console.error('Error creating book:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating book:', error);
        }
    }

    // Çıkış yap fonksiyonu
    function logOutFunc() {
        localStorage.removeItem('user');
        window.location.href = 'login.html'; // Giriş sayfasına yönlendir
    }

}

export default BooksAction;