export async function getAllBooks() {
    return await fetch('http://localhost:8088/api/books')
        .then(res => res.json());
}

export async function updateBook(book) {
    return await fetch(`http://localhost:8088/api/books/${book.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book)
    }).then(res => res.json());
}

export async function deleteBookByID(bookId) {
    return await fetch(`http://localhost:8088/api/books/${bookId}`, {
        method: 'DELETE',
    }).then(res => res.text());
}

export async function getBookById(bookId) {
    return await fetch(`http://localhost:8088/api/books/${bookId}`)
        .then(res => res.json());
}
