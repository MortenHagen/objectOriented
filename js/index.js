const books = []
const audioBooks = []

const bookForm = document.querySelector('.register-form')

const selectElement = document.querySelector('.format');
const narrator = document.querySelector('.narrator');
const idNumber = document.querySelector('.form__id');
const title = document.querySelector('.form__title')
const author = document.querySelector('.form__author')

const physicalDisplay = document.querySelector('.physical-display')
const booksUl = document.querySelector('.physical-books__list')
const audioBooksUl = document.querySelector('.audio-books__list')

const audioDisplay = document.querySelector('.audio-display')

const renderPhysicalButton = document.querySelector('.physical-books-button')
const renderAudioButton = document.querySelector('.audio-books-button')

const deleteButton = document.querySelectorAll('.physical-row button')


 selectElement.addEventListener('change', ()=>{
	if(selectElement.value === 'physical'){
		idNumber.removeAttribute('disabled', '');
		narrator.setAttribute('disabled', '');
	}   else {
		idNumber.setAttribute('disabled', '');
		narrator.removeAttribute('disabled', '');
	};
});


class Book {
	constructor(title, author, format, idNumber){
		this.title = title;
		this.author = author;
		this.selectElement = format;
		this.idNumber = idNumber;
		this.ID = Date.now();
	};
	static addBook(book){
		if (book.selectElement === 'physical'){
			books.push(book)
		} else {
			audioBooks.push(book)
		}
	}

	static deleteBook(id, booksArray){
		const index = booksArray.findIndex(book => book.ID.toString() === id.toString());
		if(index !== -1){
			booksArray.splice(index, 1);
			if(UI.activeTab === 'physical'){
				UI.renderBooks(books)
			} else {
				UI.renderAudioBooks(audioBooks)
			}
		}
	}
};

class AudioBook extends Book{
	constructor(title, author, selectElement, narrator){
		super(title, author, selectElement);
		this.narrator = narrator;
		this.ID = Date.now();
	}
}

bookForm.addEventListener('submit', (e)=>{
	e.preventDefault();
	if(selectElement.value === 'physical'){
		newBook = new Book(title.value, author.value, selectElement.value, idNumber.value)
	}	else {
		newBook = new AudioBook(title.value, author.value, selectElement.value, narrator.value)
	};

	Book.addBook(newBook)
	console.log(newBook);
	console.log(books);
	console.log(audioBooks);
});

renderPhysicalButton.addEventListener('click', ()=>{
	UI.activeTab = 'physical';
	UI.renderBooks(books)
})


renderAudioButton.addEventListener('click', ()=>{
	UI.activeTab = 'audio';
	UI.renderAudioBooks(audioBooks)
})

//DECLARE THE UI CLAS


class UI{
	static renderBooks(books){
		booksUl.textContent = ""
		physicalDisplay.style.display = "block"
		audioDisplay.style.display = "none"

		if (UI.activeTab === 'physical') {
			books.forEach(book => { 
				const liRow = document.createElement('li')
				const renderTitle = document.createElement('span')
				const renderAuthor = document.createElement('span')
				const renderFormat = document.createElement('span')
				const renderID = document.createElement('span')
				const deleteButtonContainer = document.createElement('span')
				const deleteButton = document.createElement('button');

				renderTitle.textContent = book.title;
				renderAuthor.textContent = book.author;
				renderID.textContent = book.idNumber;
				renderFormat.textContent = book.selectElement;
				deleteButton.textContent = "Delete"					
				liRow.classList.add('book-row')

				liRow.dataset.id = book.ID;

				booksUl.appendChild(liRow);
				liRow.appendChild(renderTitle);
				liRow.appendChild(renderAuthor);
				liRow.appendChild(renderID);
				liRow.appendChild(renderFormat);
				liRow.appendChild(deleteButtonContainer);
				deleteButtonContainer.appendChild(deleteButton);


				deleteButton.addEventListener('click', (e)=>{
					const rowID = e.currentTarget.parentElement.parentElement.dataset.id;
					Book.deleteBook(rowID, books)
				})	
			})
		}
	}

	static renderAudioBooks(audioBooks){
		audioBooksUl.textContent = ""
		physicalDisplay.style.display = "none"
		audioDisplay.style.display = "block"
		if (UI.activeTab === 'audio') {
			audioBooks.forEach(audioBook => { 
				const liRow = document.createElement('li')
				const renderTitle = document.createElement('span')	
				const renderAuthor = document.createElement('span')
				const renderFormat = document.createElement('span')
				const renderNarrator = document.createElement('span')
				const deleteButtonContainer = document.createElement('span')
				const deleteButton = document.createElement('button');

				renderTitle.textContent = audioBook.title;
				renderAuthor.textContent = audioBook.author;
				renderNarrator.textContent = audioBook.narrator;
				renderFormat.textContent = audioBook.selectElement;
				deleteButton.textContent = "Delete";
				liRow.classList.add('book-row');

				liRow.dataset.id = audioBook.ID;

				audioBooksUl.appendChild(liRow);
				liRow.appendChild(renderTitle);
				liRow.appendChild(renderAuthor);
				liRow.appendChild(renderNarrator);
				liRow.appendChild(renderFormat);
				liRow.appendChild(deleteButtonContainer);
				deleteButtonContainer.appendChild(deleteButton);

				deleteButton.addEventListener('click', (e)=>{
					const rowID = e.currentTarget.parentElement.parentElement.dataset.id;
					Book.deleteBook(rowID, audioBooks);
				})	
			})
		}
	}
}	