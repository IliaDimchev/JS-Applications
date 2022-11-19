const url = "http://localhost:3030/jsonstore/collections/books/"
const tBody = document.getElementsByTagName('tbody')[0];
const formTitle = document.querySelector("form h3")
const formButton = document.querySelector("form button")
const form = document.querySelector("form")
const author = document.getElementsByName("author")[0]
const title = document.getElementsByName("title")[0]

let bookEdited = undefined;

function attachEvents() {
    document.getElementById('loadBooks').addEventListener('click', getBooks)
    form.addEventListener('submit', onSave)
}

async function getBooks(e) {
    const response = await fetch(url)
    const data = await response.json();
    tBody.replaceChildren();
    for (book in data){
        const tr = document.createElement('tr')
        tr.setAttribute('data-id', book)

        const author = document.createElement('td');
        author.textContent = data[book].author
        const title = document.createElement('td');
        title.textContent = data[book].title
        const actions = document.createElement('td');
        const editBtn = document.createElement('button');
        editBtn.addEventListener('click', editBook)
        editBtn.textContent = "Edit"
        const deleteBtn = document.createElement('button');
        deleteBtn.addEventListener('click', deleteBook)
        deleteBtn.textContent = "Delete"
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        tr.appendChild(title)
        tr.appendChild(author)
        tr.appendChild(actions)
        tBody.appendChild(tr)
    }


}

async function onSave(e) {
    e.preventDefault();
    const formData = new FormData(e.target)
    const {title, author} = Object.fromEntries(formData)

    body = {
        author, 
        title
    }

    if (!title || !author) {
        return
    }

    if (formButton.textContent == "Save") {
        const response = await fetch(url + bookEdited, {
            method: "PUT",
            "Content-Type": "application/json",
            body: JSON.stringify(body)
        });
        const data = await response.json();
        formTitle.textContent = "FORM"
        formButton.textContent = "Submit"
        e.target.reset();
        getBooks()
        return data;
    } else {
        const response = await fetch(url, {
            method: "POST",
            "Content-Type": "application/json",
            body: JSON.stringify(body)
        });
        const data = await response.json();
        e.target.reset();
        getBooks()
        return data;
    }

    

}

async function editBook(e) {
    let bookId = e.target.parentElement.parentElement.getAttribute('data-id')
    bookEdited = bookId
    const response = await fetch(url + bookId);
    const data = await response.json();
    formTitle.textContent = "Edit FORM"
    title.value = data.title;
    author.value = data.author;
    formButton.textContent = "Save"
    return data;

}

async function deleteBook(e) {
    let bookId = e.target.parentElement.parentElement.getAttribute('data-id')

    const response = await fetch(url + bookId, {
        method: "DELETE",
        "Content-Type": "application/json"
    });
    const data = await response.json();
    getBooks()
    return data;
}

attachEvents();