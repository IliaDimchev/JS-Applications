function solve() {
    const stopInfo = document.getElementsByClassName('info')[0];
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let busId = 'depot'

    async function depart() {
        
        try{
            response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${busId}`);
            data = await response.json();
            console.log(busId)
            stopInfo.textContent = `Next stop ${data['name']}`
            busId = data['next'];
            departBtn.disabled = true;
            arriveBtn.disabled = false;
        } catch {
            stopInfo.textContent = `Error`
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }

    function arrive() {
        stopInfo.textContent = `Arriving at ${data['name']}`
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();