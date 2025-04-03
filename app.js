const newBookBtn = document.querySelector('#newBook');
const closeFormBtn = document.querySelector('#cancelBtn');
const subimitBookBtn = document.querySelector('#submitBtn');
const newBookModal = document.querySelector('#formContainer');
const contentHeader = document.querySelector('#contentHeader');
const libraryContainer = document.querySelector('#libraryContainer');
const bookDivId = document.querySelector('#bookDivId');

// Array to store all book objects
let myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;  // Simply flips true to false or false to true
};


//take parameters, create a book and push it to the myLibrary array
function makeNewBookInstance() {
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    let read = true;
    const readCheckbox = document.querySelector('#read');

    // check to see if checkbox is checked
    if (readCheckbox.checked) {
        read = true;
    } else {
        read = false;
    }

    // check to see if all input are filled out
    if (title.value && author.value && pages.value) {
        const newBook = new Book(title.value, author.value, pages.value, read);
            console.log("My new book is " + title.value + " by author " + author.value + " with " + pages.value + " I have read this book: " + read)
        myLibrary.push(newBook)
        console.log(myLibrary)
    } else {
        alert("Please fill out all fields")
    }
};


// create a div for each new book in library and add it to libraryContainer
function createLibraryDivs(library) {

    
    for (let i=0; i < library.length; i++) {
        const currentObject = library[i];
        var newBookdiv = document.createElement('div');
        newBookdiv.innerHTML = ``;

        for(const key in currentObject) {
            if (currentObject.hasOwnProperty(key)) {
                var bookInfo = document.createElement('div');
                bookInfo.innerHTML = `
                    <p>${key}:</p>
                    <p>${currentObject[key]}
                    `
                bookInfo.classList.add("bookInfo")
                newBookdiv.appendChild(bookInfo)
              }
        }


        //add button for read status
        if (currentObject.read === true) {
            const readButton = document.createElement('div');
        readButton.innerHTML = `
        <div>
            <i class="material-symbols-outlined">select_check_box</i>
            Read
        <div>
        `
        newBookdiv.appendChild(readButton);
        readButton.classList.add('readBtn');
        readButton.nodeType='button';
        readButton.id = "readTrue";

        } else {
            const readButton = document.createElement('div');
        readButton.innerHTML = `
            <div>
            <i class="material-symbols-outlined">check_box_outline_blank</i>
            Not Read
            <div>
        `
        newBookdiv.appendChild(readButton);
        readButton.classList.add('readBtn');
        readButton.nodeType='button';
        readButton.id ="readFalse";
        }
        

        //add delete button to newBookdiv
        const deleteBook = document.createElement('div');
        deleteBook.innerHTML = `
        <button class="deleteBtn" data-book-id="${currentObject.id}" type="button">
            <i class="material-symbols-outlined">delete</i>
            Delete
        </button>
            `;

        newBookdiv.appendChild(deleteBook);



        newBookdiv.id = currentObject['id'];
        newBookdiv.classList.add('bookDiv');




    }
    libraryContainer.appendChild(newBookdiv)

    addDeleteEventListeners();
    toggleReadStatus();

};


// Handle Delete button clicks for books from library
function addDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll('.deleteBtn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const bookId = e.target.closest('button').getAttribute('data-book-id');
            //Remove from array
            myLibrary = myLibrary.filter(book => book.id !== bookId);
            //Remove from DOM
            const bookDiv = document.getElementById(bookId);
            if (bookId) {
                bookDiv.remove();
            }
        })
    })
}

// Handle Toggle for read status buttons
function toggleReadStatus() {
    const readButtons = document.querySelectorAll('.readBtn');
    
    readButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Get the button element regardless of where in the button was clicked
            const buttonElement = e.target.closest('.readBtn');
            if (!buttonElement) return; // Exit if no button found
            
            // Get the parent book div
            const bookDiv = buttonElement.closest('.bookDiv');
            if (!bookDiv) return; // Exit if no book div found
            
            const bookId = bookDiv.id;
            
            // Find the book in myLibrary array
            const book = myLibrary.find(b => b.id === bookId);
            
            if (book) {
                // Toggle the book's read status
                book.toggleRead();
                
                // Update the button UI
                buttonElement.innerHTML = book.read ? `
                <div>
                    <i class="material-symbols-outlined">select_check_box</i>
                    Read
                </div>
                ` : `
                <div>
                    <i class="material-symbols-outlined">check_box_outline_blank</i>
                    Not Read
                </div>
                `;
                buttonElement.id = book.read ? "readTrue" : "readFalse";
            }
        });
    });
}


// clear new-book-form fields, applied to submit button event listener
function clearForm() {
    document.forms['new-book-form'].reset();
}

// open new-book-form and hide contentHeader
function addNewBookForm() {
    newBookModal.classList.remove('modalClose');
    contentHeader.classList.add('modalClose');


};


// close new-book-form and show contentHeader
function closeNewBookForm() {
    contentHeader.classList.remove('modalClose');
    newBookModal.classList.add('modalClose');
}


// Event listeners ----->

newBookBtn.addEventListener('click', ()=> {
    addNewBookForm();
});


closeFormBtn.addEventListener('click', () => {
    closeNewBookForm();
})


subimitBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    makeNewBookInstance();
    createLibraryDivs(myLibrary);
    clearForm();
    contentHeader.classList.remove('modalClose');
    newBookModal.classList.add('modalClose');


    
});



