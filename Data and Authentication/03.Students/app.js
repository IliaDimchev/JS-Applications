const url = "http://localhost:3030/jsonstore/collections/students"
const tBody = document.querySelector("#results tbody");

function attachEvents() {

    getStudents();

    const form = document.getElementById('form');
    form.addEventListener('submit', createStudent);


}

async function createStudent(e) {
    e.preventDefault()

    const formData = new FormData(e.target);
    let { firstName, lastName, facultyNumber, grade } = Object.fromEntries(formData)
    const body = {
        firstName,
        lastName,
        facultyNumber,
        grade
    }

    if (!firstName || !lastName || !facultyNumber || !grade) {
        alert('All fields are required')
    } else {
        const response = await fetch(url, {
            method: "POST",
            "Content-Type": "application/json",
            body: JSON.stringify(body)
        });
        const data = await response.json()
        e.target.reset();
        getStudents();
        return data
    }


}

async function getStudents(e) {
    tBody.replaceChildren();
    const response = await fetch(url);
    const data = await response.json();
    for (student in data) {
        const tr = document.createElement('tr');
        const firstName = document.createElement('td');
        firstName.textContent = data[student].firstName

        const lastName = document.createElement('td');
        lastName.textContent = data[student].lastName

        const facultyNumber = document.createElement('td');
        facultyNumber.textContent = data[student].facultyNumber

        const grade = document.createElement('td');
        grade.textContent = data[student].grade

        tr.appendChild(firstName)
        tr.appendChild(lastName)
        tr.appendChild(facultyNumber)
        tr.appendChild(grade)
        tBody.appendChild(tr)
    }
    return data

}
attachEvents();