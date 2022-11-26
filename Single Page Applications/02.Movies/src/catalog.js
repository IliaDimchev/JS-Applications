import { htmlGenerator } from "./dom.js";
import { showDetails } from "./details.js";

const homePageSection = document.querySelectorAll('.view-section')[0];
const movieSection = homePageSection.querySelector('#movie');

export async function getAllMovies() {
    try {
        const response = await fetch('http://localhost:3030/data/movies');
        const data = await response.json();

        if (!response.ok) {
            throw new Error(response.message);
        }

        movieSection.replaceChildren();
        const divMt3 = htmlGenerator('div', '', 'mt-3', movieSection);
        const divRow = htmlGenerator('div', '', 'row d-flex d-wrap', divMt3);
        const divCardDeck = htmlGenerator('ul', '', 'card-deck d-flex justify-content-center', divRow);
        divCardDeck.id = 'movies-list';

        Object.values(data)
            .forEach(info => {


                const divCard = htmlGenerator('li', '', 'card mb-4', divCardDeck);

                const img = htmlGenerator('img', '', 'card-img-top', divCard);
                img.setAttribute('src', info.img);
                img.alt = 'Card image cap';
                img.width = '400';

                const divCardBody = htmlGenerator('div', '', 'card-body', divCard);
                htmlGenerator('h4', info.title, 'card-title', divCardBody);

                const divCardFooter = htmlGenerator('div', '', 'card-footer', divCard);
                const anchor = htmlGenerator('a', '', '', divCardFooter);
                anchor.setAttribute('href', '#');

                const detailsBtn = htmlGenerator('button', 'Details', 'btn btn-info', divCardFooter);
                detailsBtn.type = 'button';
                detailsBtn.setAttribute('id', info._id);

                detailsBtn.addEventListener('click', () => showDetails(info._id));
            });

        if (!response.ok) {
            throw new Error(response.message);
        }

    } catch (error) {
        alert(error.message);
    }
}