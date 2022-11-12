(async function solution() {
   articlesUrl = "http://localhost:3030/jsonstore/advanced/articles/list"
   articlesDetailsUrl = "http://localhost:3030/jsonstore/advanced/articles/details/"

   const main = document.getElementById('main');
   main.addEventListener('click', onClick);

   const response = await fetch(articlesUrl);
   const data = await response.json();

   function onClick(e) {
       console.log(e.target.parentElement.parentElement.children[1].display);
       let content = e.target.parentElement.parentElement.children[1];
       if (e.target.tagName === "BUTTON"){
           if (e.target.innerHTML === "More"){
                e.target.innerHTML = "Less"
                content.setAttribute("style", `display: block;`)
           } else if (e.target.innerHTML === "Less")  {
            e.target.innerHTML = "More"
            content.setAttribute("style", `display: none;`)
           }
       }
   }

   for (article in data){
    // console.log(data[article]._id);
    const responseDetails = await fetch(articlesDetailsUrl + data[article]._id)
    const dataDetails = await responseDetails.json()
    const {_id, title, content} = dataDetails;
    let div = document.createElement('div');
    div.classList.add('accordion');
    div.innerHTML = `
            <div class="head">
                <span>${title}</span>
                <button class="button" id="${_id}">More</button>
            </div>
            <div class="extra">
                <p>${content}</p>
            </div>
    `
    main.appendChild(div);
   }
})();