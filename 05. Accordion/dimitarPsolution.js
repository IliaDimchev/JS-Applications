(function solution() {
 
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const urlDetails = 'http://localhost:3030/jsonstore/advanced/articles/details/';
 
    const mainE = document.getElementById("main");
 
    fetch(url)
        .then(response => response.json())
        .then(data => {
 
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    let accordionDiv = document.createElement('div');
                    accordionDiv.classList.add('accordion');
                    accordionDiv.innerHTML = `<div class="head"><span></span><button class="button">More</button></div><div class="extra"><p></p></div>`;
 
                    let spanE = accordionDiv.getElementsByTagName('span')[0];
                    let btnE = accordionDiv.getElementsByTagName('button')[0];
                    let pE = accordionDiv.getElementsByTagName('p')[0];
                    let extraDivE = accordionDiv.getElementsByTagName('div')[1];
 
                    const article = data[key];
 
                    btnE.id = article._id;
                    spanE.textContent = article.title;
                    let u = urlDetails + article._id;
 
                    fetch(u)
                        .then(r => r.json())
                        .then(d => {
                            pE.textContent = d.content;
                        })
                        .catch(error1 => console.log(error1));
 
 
                    extraDivE.style.display = 'none';
 
                    mainE.appendChild(accordionDiv);
 
                    btnE.addEventListener('click', (e) => {
                        let target = e.target;
 
                        if (target.textContent == 'More') {
                            target.textContent = 'Less';
                            extraDivE.style.display = 'inline';                            
                        } else {
                            target.textContent = 'More';
                            extraDivE.style.display = 'none';
                        }
                    });
                }
            }
        })
        .catch(error => console.log(error))
})()