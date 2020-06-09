// Book Class: Represents a book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


// UI Class: Handle UI Tasks
class UI {
    static DisplayBooks() {
        // const StoreBooks = [
        //     {
        //         title: "Book-One",
        //         author: "Author-One",
        //         isbn: "123456"
        //     },
        //     {
        //         title: "Book-Two",
        //         author: "Author-Two",
        //         isbn: "123457"
        //     }
        // ]
        const books = Store.getBook();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td><a href="#" class="btn btn-danger btn-sm-delete">X</a></td>
            `;
        list.appendChild(row);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
    // Delete Book
    static deleteBook(el) {
        if (el.classList.contains('btn-sm-delete')) {
            el.parentElement.parentElement.remove();
        }
    }
    // Show Alert
    static showAlert(massage, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(massage));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // Vanish in 3 second
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }
}



// Store Class: Handles  Storage 
class Store {
    static getBook() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBook();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn) {
        const books = Store.getBook();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        })

        localStorage.setItem('books', JSON.stringify(books))
    }
}
// Event: Display a Book


document.addEventListener('DOMContentLoaded', UI.DisplayBooks);



// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // set prevent actual submit
    e.preventDefault();
    // Get Form Value
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    // Validate
    if (title == '' || author == '' || isbn == '') {
        UI.showAlert("Please fill in all fields", "danger");
    } else {
        // Instatiate book
        const book = new Book(title, author, isbn);
        // Add Book to UI
        UI.addBookToList(book);
        // Add book to store
        Store.addBook(book);
        // Show Succes
        UI.showAlert('Book Added', 'success');
        // Clear Fields
        UI.clearFields();
    }
})



// Event: Remove a Book

document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteBook(e.target);
    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    // Show Succes
    UI.showAlert('Book Remove', 'primary');
});