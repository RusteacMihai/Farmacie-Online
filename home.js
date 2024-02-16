let left_btn = document.getElementsByClassName('bi-chevron-left')[0];
let right_btn = document.getElementsByClassName('bi-chevron-right')[0];
let cards = document.getElementsByClassName('cards')[0];

left_btn.addEventListener('click', ()=> {
    cards.scrollLeft -= 140;
});
right_btn.addEventListener('click', ()=> {
    cards.scrollLeft += 140;
});

let card = document.getElementsByClassName('card');

card.addEventListener('click', async() =>{
    displayTrailer(data);
});

async function fetchData() {
    return await fetch("http://localhost:3002/movies").then((response) =>
      response.json()
    );
};
const filmul_saptamanii = document.getElementById("filmul-saptamanii");

function displayTrailer(data) {
    filmul_saptamanii.innerHTML = ""
    data.forEach((element) => {
        filmul_saptamanii.innerHTML += `
        <div class="video-filmul-saptamanii">
        <div class="filmul-saptamanii-informatii overlay" >
            <h1 class="titlul-filmul-saptamanii">Most popular this week : </h1>
            <h2> ${element.title}</h2>
            <h3> ${element.year}</h3>
            <h4 class="descriere-filmul-saptamanii">${element.description}</h4>
        </div>
        <video id="video-ul-saptamanii" src=${element.video} autoplay muted></video>
    </div>`;
    });
    
  };

