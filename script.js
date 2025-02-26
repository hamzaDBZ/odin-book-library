let myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status ? "read" : "not read";
}

Book.prototype.toggleRead = function () {
    this.status = this.status === "read" ? "not read" : "read";
}

function addBookToLibrary(title, author, pages, status) {
    const myBook = new Book(title, author, pages, status);
    myLibrary.push(myBook);
}

function displayBook(book) {
    const title = document.createElement('td');
    title.textContent = book.title;
    title.setAttribute('data-book-title', book.title)
    const author = document.createElement('td');
    author.textContent = book.author;
    const pages = document.createElement('td');
    pages.textContent = book.pages;

    const status = document.createElement('td');
    status.appendChild(document.createElement('button'));
    status.querySelector('button').textContent = book.status;
    status.querySelector('button').className = 'status';
    if (book.status === 'read') {
        status.querySelector('button').classList.toggle("read");
    }

    const remove = document.createElement('td');
    remove.appendChild(document.createElement('button'))
    remove.querySelector('button').textContent = `Remove`;
    remove.querySelector('button').className = 'remove';

    const row = document.createElement('tr');
    row.appendChild(title);
    row.appendChild(author);
    row.appendChild(pages);
    row.appendChild(status);
    row.appendChild(remove);

    document.querySelector('tbody').appendChild(row);
}

function displayLib() {
    myLibrary.forEach(displayBook);

    if (document.querySelectorAll('.remove').length === 0) {
        const blank = document.createElement('td');
        blank.textContent = `You Have No Books In Your Library`;
        blank.setAttribute('colspan', '5');
        blank.setAttribute('class', 'empty');
        blank.style.color = '#777'
        const row = document.createElement('tr');
        row.appendChild(blank);
        document.querySelector('tbody').appendChild(row);
    }
}

addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("The Secret", "Rhonda Byrne", 198, true);
addBookToLibrary("A Song of Ice and Fire", "George R.R Martin", 5232, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 192, true);

displayLib();

// REMOVEBOOK
document.querySelector('tbody').addEventListener('click', (event) => {
    let target = event.target;
    if (target.className === "remove") {
        let element = target.parentElement.parentElement;
        myLibrary = myLibrary.filter((item) => 
            item.title !== element
                .querySelector('[data-book-title]')
                .getAttribute('data-book-title'))

        element.remove();
        if (!myLibrary.length)
            displayLib();
    }
})

// ADDBOOK
const addBook = document.querySelector('.add-book');
addBook.addEventListener('click', () => {
    const dialog = document.querySelector('dialog');
    document.querySelector('dialog form input[name="title"]').value= "";
    document.querySelector('dialog form input[name="author"]').value= "";
    document.querySelector('dialog form input[name="number-of-pages"]').value= "0";
    dialog.showModal();
})

const close = document.querySelector('dialog button:last-child');
close.addEventListener('click', () => {
    const dialog = document.querySelector('dialog');
    dialog.close();
})

const addbtn = document.querySelector('button.add');
addbtn.addEventListener('click', () => {
    const title = document.querySelector('input[name="title"]').value;
    const author = document.querySelector('input[name="author"]').value;
    const pages = document.querySelector('input[name="number-of-pages"]').value;
    const status = document.querySelector('input[name="status"]').checked;
    if (title === "" || author === "" || +pages <= 0) return;
    if (myLibrary.length === 0)
        document.querySelector('.empty').parentElement.remove();
    const book = new Book(title, author, pages, status);
    myLibrary.push(book);
    displayBook(book);
    const bookStatus = document.querySelectorAll('.status');
    bookStatus[bookStatus.length - 1].addEventListener('click', () => {
        bookStatus[bookStatus.length - 1].classList.toggle("read");
        book.toggleRead();
        bookStatus[bookStatus.length - 1].textContent = `${book.status}`;
    });
})

document.querySelectorAll('.status').forEach((status) => {
    status.addEventListener('click', () => {
        const statusRowTitle = status.parentElement.parentElement.querySelector('[data-book-title]').getAttribute('data-book-title');
        myLibrary.forEach((book) => {
            if (book.status === status.textContent && statusRowTitle === book.title) {
                book.toggleRead();
                status.textContent = `${book.status}`;
                status.classList.toggle("read");
            }
        })
    })
})


