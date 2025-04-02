let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();

}

function makeNewBookInstance() {
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    let read = true;
    const readCheckbox = document.querySelector('#read');

    /* check to see if checkbox is checked */
    if (readCheckbox.checked) {
        read = true;
    } else {
        read = false;
    }

    /* check to see if all input are filled out */
    if (title.value && author.value && pages.value) {
        const newBook = new Book(title.value, author.value, pages.value, read);
            console.log("My new book is " + title.value + " by author " + author.value + " with " + pages.value + " I have read this book: " + read)
        myLibrary.push(newBook)
        console.log(myLibrary)
    } else {
        alert("Please fill out all fields")
    }


};

function createLibraryDivs(library) {
    for (let i=0; i < library.length; i++) {
        const currentObject = library[i];
        console.log(`object at index ${i}`);
        var newBookdiv = document.createElement('div');
        newBookdiv.innerHTML = ``;

        for(const key in currentObject) {
            if (currentObject.hasOwnProperty(key)) {
                console.log(`  ${key}: ${currentObject[key]}`);
                



                var bookInfo = document.createElement('div');
                bookInfo.innerHTML = `
                    <p>${key}:</p>
                    <p>${currentObject[key]}
                    `
                bookInfo.classList.add("bookInfo")
                newBookdiv.appendChild(bookInfo)
                

              }
        }



        libraryContainer.appendChild(newBookdiv)
        newBookdiv.classList.add('bookDiv')
    }

    


};

const newBookBtn = document.querySelector('#newBook');
const closeFormBtn = document.querySelector('#cancelBtn');
const subimitBookBtn = document.querySelector('#submitBtn');
const newBookModal = document.querySelector('#formContainer');
const contentHeader = document.querySelector('#contentHeader');
const libraryContainer = document.querySelector('#libraryContainer');

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


subimitBookBtn.addEventListener('click', () => {

    makeNewBookInstance();
    createLibraryDivs(myLibrary);
    contentHeader.classList.remove('modalClose');
    newBookModal.classList.add('modalClose');
    
})



