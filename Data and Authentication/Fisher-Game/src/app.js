window.addEventListener("DOMContentLoaded", onLoadHTML);
document.getElementById("addForm").addEventListener("submit", createCatch);
document.querySelector(".load").addEventListener("click", onLoadCatch);
document.getElementById("logout").addEventListener("click", onLogout);
const catches = document.getElementById('catches')
const main = document.getElementById('main')
const homeView = document.getElementById('home-view')


async function onLogout() {
    const url = "http://localhost:3030/users/logout";

    const header = getHeader("GET", null);
    sessionStorage.clear();
    onLoadHTML();
}

function onLoadHTML() {
    catches.replaceChildren();
    let p = document.createElement('p');
    p.textContent = "Click to load catches"
    catches.appendChild(p)
    const userName = document.querySelector("p.email span");
    const addBtn = document.querySelector(".add");
    try {
        const token = JSON.parse(sessionStorage.getItem("userData")).accessToken;
        document.getElementById("guest").style.display = "none";
        document.getElementById("user").style.display = "inline-block";
        userName.innerHTML = JSON.parse(sessionStorage.getItem("userData")).email;
        addBtn.disabled = false;
    } catch {
        document.getElementById("guest").style.display = "inline-block";
        document.getElementById("user").style.display = "none";
        userName.innerHTML = "guest";
        addBtn.disabled = true;
    }
}

async function onLoadCatch() {
    catches.replaceChildren();
    const url = "http://localhost:3030/data/catches";

    const response = await fetch(url);
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        const div = document.createElement('div')
        div.classList.add('catch')

        const anglerLabel = document.createElement('label')
        anglerLabel.textContent = "Angler"
        const anglerInput = document.createElement('input')
        anglerInput.type = "text"
        anglerInput.value = data[i].angler
        anglerInput.setAttribute('value', data[i].angler)
        anglerInput.disabled = true
        anglerInput.classList.add("angler")

        const weightLabel = document.createElement('label')
        weightLabel.textContent = "Weight"
        const weightInput = document.createElement('input')
        weightInput.type = "number"
        weightInput.value = data[i].weight
        weightInput.setAttribute('value', data[i].weight)
        weightInput.disabled = true
        weightInput.classList.add("weight")

        const speciesLabel = document.createElement('label')
        speciesLabel.textContent = "Species"
        const speciesInput = document.createElement('input')
        speciesInput.type = "text"
        speciesInput.value = data[i].species
        speciesInput.setAttribute('value', data[i].species)
        speciesInput.disabled = true
        speciesInput.classList.add("species")

        const locationLabel = document.createElement('label')
        locationLabel.textContent = "Location"
        const locationInput = document.createElement('input')
        locationInput.type = "text"
        locationInput.value = data[i].location
        locationInput.setAttribute('value', data[i].location)
        locationInput.disabled = true
        locationInput.classList.add("location")

        const baitLabel = document.createElement('label')
        baitLabel.textContent = "Bait"
        const baitInput = document.createElement('input')
        baitInput.type = "text"
        baitInput.value = data[i].bait
        baitInput.setAttribute('value', data[i].bait)
        baitInput.disabled = true
        baitInput.classList.add("bait")

        const captureTimeLabel = document.createElement('label')
        captureTimeLabel.textContent = "Capture Time"
        const captureTimeInput = document.createElement('input')
        captureTimeInput.type = "number"
        captureTimeInput.value = data[i].captureTime
        captureTimeInput.setAttribute('value', data[i].captureTime)
        captureTimeInput.disabled = true
        captureTimeInput.classList.add("captureTime")

        const updateBtn = document.createElement('button')
        updateBtn.classList.add('update')
        updateBtn.textContent = "Update"
        updateBtn.addEventListener('click', updateCatch)
        updateBtn.disabled = true
        updateBtn.setAttribute('data-id', data[i]._id)

        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete')
        deleteBtn.textContent = "Delete"
        deleteBtn.addEventListener('click', onDelete)
        deleteBtn.disabled = true
        deleteBtn.setAttribute('data-id', data[i]._id)

        try {
            if (data[i]._ownerId === JSON.parse(sessionStorage.getItem("userData")).id) {
                anglerInput.disabled = false
                weightInput.disabled = false
                speciesInput.disabled = false
                locationInput.disabled = false
                baitInput.disabled = false
                captureTimeInput.disabled = false
                updateBtn.disabled = false
                deleteBtn.disabled = false
            }
        } catch {

        }

        div.appendChild(anglerLabel)
        div.appendChild(anglerInput)
        div.appendChild(weightLabel)
        div.appendChild(weightInput)
        div.appendChild(speciesLabel)
        div.appendChild(speciesInput)
        div.appendChild(locationLabel)
        div.appendChild(locationInput)
        div.appendChild(baitLabel)
        div.appendChild(baitInput)
        div.appendChild(captureTimeLabel)
        div.appendChild(captureTimeInput)
        div.appendChild(updateBtn)
        div.appendChild(deleteBtn)

        catches.appendChild(div)
    }

    return data;
}


async function updateCatch(e) {
    const url = "http://localhost:3030/data/catches/";

    let child = e.target.parentElement.children
    let angler = child[1].value
    let weight = child[3].value
    let species = child[5].value
    let location = child[7].value
    let bait = child[9].value
    let captureTime = child[11].value

    console.log(e.target.parentElement.children)


    let body = {
        "_ownerId": JSON.parse(sessionStorage.getItem("userData")).id,
        "angler": angler,
        "weight": weight,
        "species": species,
        "location": location,
        "bait": bait,
        "captureTime": captureTime,
        "_id": e.target.getAttribute('data-id')
    }
    const header = getHeader("PUT", body);
    const response = await fetch(url + e.target.getAttribute('data-id'), header);
    const data = await response.json();
    onLoadCatch();
    return data;
}

async function onDelete(e) {
    console.log(e.target.getAttribute('data-id'))

    const url = "http://localhost:3030/data/catches/";
    const header = getHeader("DELETE");
    const response = await fetch(url + e.target.getAttribute('data-id'), header);
    const data = await response.json();
    onLoadCatch();
    return data;

}



function createCatch(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    let data = Object.fromEntries(formData);
    data['_ownerId'] = JSON.parse(sessionStorage.getItem("userData")).id
    onCreateCatch(data);
    e.target.reset()
}

async function onCreateCatch(body) {
    const url = "http://localhost:3030/data/catches";
    const header = getHeader("POST", body);
    const response = await fetch(url, header);
    const data = await response.json();
    onLoadCatch();
    return data;

}

function getHeader(method, body) {
    const token = JSON.parse(sessionStorage.getItem("userData")).accessToken;
    const header = {
        method: `${method}`,
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": token
        },
    }
    if (body) {
        header.body = JSON.stringify(body);
    }
    return header;
}
