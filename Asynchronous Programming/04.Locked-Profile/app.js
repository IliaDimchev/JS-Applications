async function lockedProfile() {
    const main = document.getElementById('main');
    main.addEventListener('click', onToggle);

    const initialProfile = document.getElementsByClassName('profile')[0];
    const url = "http://localhost:3030/jsonstore/advanced/profiles"
    const response = await fetch(url)
    const data = await response.json()

    main.removeChild(initialProfile);

    for (user in data){
        const {_id, username, email, age} = data[user]
        makeProfile(username, email, age)
        
    }

    function onToggle(e) {
        let change = e.target.parentElement.children[9].style
        let unlocked = e.target.parentElement.children[4].checked
        console.log(unlocked)
        if (unlocked) {
            if (e.target.innerHTML === "Show more" && e.target.tagName === "BUTTON"){
                e.target.outerHTML = "<button>Hide it</button>"
                change.display = "block"
            
            } else if (e.target.innerHTML === "Hide it" && e.target.tagName === "BUTTON") {
                e.target.outerHTML = "<button>Show more</button>"
                change.display = "none"
            }
        }
    }


    function makeProfile(username, email, age) {
        let div = document.createElement('div')
        div.classList.add('profile');
        div.innerHTML = `        			
        <img src="./iconProfile2.png" class="userIcon" />
        <label>Lock</label>
        <input type="radio" name="${username}Locked" value="lock" checked>
        <label>Unlock</label>
        <input type="radio" name="${username}Locked" value="unlock"><br>
        <hr>
        <label>Username</label>
        <input type="text" name="${username}" value="${username}" disabled readonly />
        <div class="${username}HiddenFields" style="display: none;">
            <hr>
            <label>Email:</label>
            <input type="email" name="${email}" value="${email}" disabled readonly />
            <label>Age:</label>
            <input type="text" name="${age}" value="${age}" disabled readonly />
        </div>
        
        <button>Show more</button>`
    main.appendChild(div);

    }
}