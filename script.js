`use strict`;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
	var bookList = document.getElementById("books");
	var nameAuthor = document.createElement("div");
	
	function addBooksToList(book) {
		let div = document.createElement("div");
		let img = document.createElement("img");
		let content = document.createElement("div");
		let author = document.createElement("h5");
		let titleBook = document.createElement("div");
		
		titleBook.className = "titleBook";
		titleBook.innerHTML = book.title;
		div.className = "container";
		content.className = "content-book";
		author.innerHTML = book.author_name;
		img.src = "https://covers.openlibrary.org/b/id/" + book.cover_i + ".jpg";
		
		if (book.cover_i == undefined || book.cover_i == "-1" ) {
			img.src = "img/logo.svg";
			img.style.border = "solid 1px grey"
		}
		
		div.appendChild(img);
		div.appendChild(content);
		content.appendChild(author);
		bookList.appendChild(div);
		content.appendChild(titleBook)
	}

	function getData(url, done) {
		let xhr = new XMLHttpRequest();
		xhr.open("GET", url)
		xhr.onload = function() {
			if (xhr.status === 200) {
				let json = JSON.parse(xhr.response);
				let input = document.getElementById("input");
				let str = document.getElementById("input-search-books").value
				done(json.docs);
				nameAuthor.className = "nameAuthor";
				nameAuthor.innerHTML = str.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ')
				input.appendChild(nameAuthor);
			} else {
				console.error(xhr.statusText);
			}
		};
		xhr.onerror = function(error) {
			console.error(error);
		};
		xhr.send();
	}

	function getChar(event) {
	    if (event.keyCode == 13) getSearch(); 
	}

	document.addEventListener("keydown", getChar)
	document.getElementById("button-search").onclick = getSearch;

	function getSearch() {
		nameAuthor.innerHTML = '';
		bookList.innerHTML = ''
		let search = document.getElementById("input-search-books").value;
		return getData(`http://openlibrary.org/search.json?q=${search}`, function(books) {
			books.forEach(function(book) {
				addBooksToList(book);
			});
		});
	}
}



