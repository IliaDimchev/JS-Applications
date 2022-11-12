window.addEventListener("DOMContentLoaded", onLoadHTML);
document.getElementById("addForm").addEventListener("submit", createCatch);
document.querySelector(".load").addEventListener("click", onLoadCatch);
document.getElementById("logout").addEventListener("click", onLogout);




async function onLogout() {
    const url = "http://localhost:3030/users/logout";

    const header = getHeader("GET", null);
    sessionStorage.clear();
    onLoadHTML();
}

function onLoadHTML() {
    const token = sessionStorage.getItem("accessToken");
    const userName = document.querySelector("p.email span");
    const addBtn = document.querySelector(".add");
    if (token){
        document.getElementById("guest").style.display = "none";
        document.getElementById("user").style.display = "inline-block";
        userName.innerHTML = sessionStorage.getItem("email");
        addBtn.disabled = false;
    } else {
        document.getElementById("guest").style.display = "inline-block";
        document.getElementById("user").style.display = "none";
        userName.innerHTML = "guest";
        addBtn.disabled = true;
    }
}

async function onLoadCatch() {
    const url = "http://localhost:3030/data/catches";

    const response = await fetch(url);
    const data = await response.json();
    // Render Method
    return data;
}


function createCatch(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    onCreateCatch(data);
}

async function onCreateCatch(body) {
    const url = "http://localhost:3030/data/catches";
    const header = getHeader("POST", body);
    const response = await fetch(url, header);
    const data = await response.json();
    return data;

}

function getHeader(method, body) {
    const token = sessionStorage.getItem("accessToken");
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
