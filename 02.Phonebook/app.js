function attachEvents() {
    const url = "http://localhost:3030/jsonstore/phonebook/"
    const btnLoad = document.getElementById('btnLoad');
    btnLoad.addEventListener('click', onLoad);

    const btnCreate = document.getElementById('btnCreate');
    btnCreate.addEventListener('click', onCreate);

    const phones = document.getElementById('phonebook');
    const person = document.getElementById('person');
    const phone = document.getElementById('phone');
    

    async function onLoad(e) {
        phones.innerHTML = "";
        const response = await fetch(url);
        const data = await response.json();
        for (contact in data){
            const {person, phone, _id} = data[contact]
            const li = document.createElement('li')
            li.textContent = `${person}: ${phone}`;
            li.setAttribute('data-id', _id)

            const btn = document.createElement("button");
            btn.textContent = "Delete"
            btn.addEventListener('click', onDelete);
            li.appendChild(btn)
            phones.appendChild(li)

        }
        return data;
    }

    async function onDelete(e) {
        const key = e.target.parentElement.getAttribute('data-id')
        const response = await fetch(url + key, {
            method: "DELETE",
            "Content-Type": "application/json"
        })
        const data = await response.json();
        onLoad();
        return data;
    }

    async function onCreate(e) {
        if (person.value == "" || phone.value == ""){
            return
        }
        const response = await fetch(url, {
            method: "POST",
            "Content-Type": "application/json",
            body: JSON.stringify({
                "person": `${person.value}`,
                "phone": `${phone.value}`
            })
        });
        const data = await response.json();
        phone.value = ""
        person.value = ""
        onLoad();
        return data;
    }

};

attachEvents();