const myLibrary = [];

function Book(title, author, pages, pubDate, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.pubDate = pubDate;
    this.read = read;
}

function addBookToLibrary(title, author, pages, pubDate, rating, read) {
    const newBook = new Book(title, author, pages, pubDate, rating, read){

    }

    myLibrary.append(newBook)
}

const addNewBookBtn = document.getElementById('#new-book-btn');


addNewBookBtn.addEventListener('click', () => {
    const newBookInputDiv = `

    `
})
