async function getInfo() {
    const url = "http://localhost:3030/jsonstore/bus/businfo/"
    const inputField = document.getElementById("stopId")
    const busId = inputField.value;

    const stopNameField = document.getElementById("stopName");
    const busesField = document.getElementById("buses");

    
    // await fetch(url+busId)

    busesField.innerHTML= "";
    try {
        const response = await fetch(url+busId)
        const data = await response.json()
        
        if (!inputField.value){
            throw new Error
        }

        stopNameField.textContent = data.name;
        for (bus in data.buses) {
            let li = document.createElement('li')
            li.textContent = `Bus ${bus} arrives in ${data.buses[bus]} minutes`
            busesField.appendChild(li)
        }
    } catch {
        stopNameField.textContent = "Error";
    }
}