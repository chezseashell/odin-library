const myLibrary = [];

function Book(title, author, pages, pubDate, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.pubDate = pubDate;
    this.read = read;
    this.id = crypto.randomUUID();

}

// function addBookToLibrary(title, author, pages, pubDate, rating, read) {
//     const newBook = new Book(title, author, pages, pubDate, rating, read){

//     }

//     myLibrary.append(newBook)
// }

const newBookBtn = document.querySelector('#newBook');
const closeFormBtn = document.querySelector('#cancelBtn');
const subimitBookBtn = document.querySelector('#submitBtn');
const newBookModal = document.querySelector('#formContainer');
const contentHeader = document.querySelector('#contentHeader');

function addNewBookForm() {
    newBookModal.classList.remove('modalClose');
    contentHeader.classList.add('modalClose');
};



function closeNewBookForm() {
    contentHeader.classList.remove('modalClose');
    newBookModal.classList.add('modalClose');
}

newBookBtn.addEventListener('click', ()=> {
    addNewBookForm();
});


closeFormBtn.addEventListener('click', () => {
    closeNewBookForm();
})




