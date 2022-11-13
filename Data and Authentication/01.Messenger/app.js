function attachEvents() {
    submitBtn.addEventListener('click', onPost);
    refreshBtn.addEventListener('click', onRefresh)
}

const submitBtn = document.getElementById('submit');
const refreshBtn = document.getElementById('refresh');
const chatBox = document.getElementById('messages');

const user = document.getElementsByName('author')[0];
const content = document.getElementsByName('content')[0];

const url = "http://localhost:3030/jsonstore/messenger"

async function onPost(e) {
    e.preventDefault();
    try {
        if (user.value === "" || content.value === "")
        {
            throw new Error("empty fields")
        }
        const response = await fetch(url, {
            "method": "POST",
            "Content-Type": "Application/json",
            "body":JSON.stringify({
                "author": `${user.value}`,
                "content": `${content.value}`
            })
        })
        if (!response.ok)
        {
            throw new Error
        }
        const data = await response.json()
        
        user.value = ""
        content.value = ""

        onRefresh()
    } catch (error) {
        console.log(error);
    }


}

async function onRefresh(e) {  
    try {
        const response = await fetch(url);

        if (!response.ok){
            throw new Error
        }
        
        const data = await response.json();
        buff = [];
        for (message in data) {
            const {author, content} = data[message];
            buff.push(`${author}: ${content}`)
            
        }
        chatBox.textContent = buff.join('\n')
    } catch (error) {
        console.log(error);
    }
}

attachEvents();