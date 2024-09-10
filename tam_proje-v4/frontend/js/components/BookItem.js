import {
    getAllBooks,
    getBookById,
    deleteBookByID,
    updateBook
} from "../api/books.js";


function BookItem(book) {
    async function deleteItem(node) {
        let bookId = node.name.split('-')[1]; // "delete-" kısmını ayırıyoruz
        const booksTableBody = document.getElementById('booksTableBody');

        await deleteBookByID(bookId);
        let allBooks = await getAllBooks();
        booksTableBody.innerHTML = '';
        allBooks.forEach(book => {
            BookItem(book).initialize();
        })
        BookItem().initEventListener();
    }

    async function openModal(node) {
        let bookId = node.name.split('-')[1];
        let book = await getBookById(bookId);
        document.getElementById('updateTitle').value = book.title;
        document.getElementById('updatePrice').value = book.price;
        $('#updateBookModal').modal('show');

        let updateBtn = document.getElementById('modalUpdate');
        updateBtn.removeEventListener('click', handleUpdate); // Eski dinleyiciyi kaldır
        updateBtn.addEventListener('click', handleUpdate);

        async function handleUpdate(event) {
            await updateItem(event, book);
            updateBtn.removeEventListener('click', handleUpdate); // İşlemden sonra dinleyiciyi kaldır
        }
    }



    async function updateItem(event, book) {
        event.preventDefault();
        let newTitle = document.getElementById('updateTitle').value;
        let newPrice = document.getElementById('updatePrice').value;

        await updateBook({
            id: book.id,
            title: newTitle,
            price: newPrice,
        });

        $('#updateBookModal').modal('hide');

        let allBooks = await getAllBooks();
        booksTableBody.innerHTML = '';
        allBooks.forEach(book => {
            BookItem(book).initialize();
        });

        BookItem().initEventListener();
    }

    function initEventListener() {
        document.querySelectorAll('td > button[name^="delete-"]').forEach(deleteBtn => {
            deleteBtn.addEventListener('click', (ev) => {
                deleteItem(deleteBtn);
            })
        });
        document.querySelectorAll('td > button[name^="update-"]').forEach(updateBtn => {
            updateBtn.addEventListener('click', (ev) => {
                openModal(updateBtn);
            })
        });
    }

    return {
        initialize: function () {
            const booksTableBody = document.getElementById('booksTableBody');
            booksTableBody.innerHTML += `
                <tr>
                    <td>${book.id}</td>
                    <td>${book.title}</td>
                    <td>${book.price}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" name="update-${book.id}">Güncelle</button>
                        <button class="btn btn-danger btn-sm" name="delete-${book.id}">Sil</button>
                    </td>
                </tr>
            `;
        },
        initEventListener: initEventListener,
        updateItem
    };
}

export default BookItem;