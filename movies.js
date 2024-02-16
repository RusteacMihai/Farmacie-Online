const categorii = document.getElementById("selectCategorie");
const containerMovies = document.getElementById("containerMovies");
console.log("categorii html", categorii);

const filtruButton = document.getElementById("filtruButton");

console.log("filtruButton", filtruButton);

const ratingdropdown = document.getElementById("selectRating");

console.log("ratingdropdown", ratingdropdown);

const yeardropdown = document.getElementById("selectAn");

console.log("yeardropdown", yeardropdown);

var filtruCategorie = "all";

const selectedCateg = categorii.addEventListener("change", async (e) => {
  const filtru = e.target.value.toLowerCase();
  filtruCategorie = filtru;
  // const movies = await fetchData();
  console.log(filtruCategorie);
});

var filtruStele = "all";

const selectedRating = ratingdropdown.addEventListener("change", async (e) => {
  const filtru = e.target.value.toLowerCase();
  filtruStele = filtru;
  // const movies = await fetchData();
  console.log(filtruStele);
});

console.log(filtruStele);

var filtruAn = "all";

const selectedYear = yeardropdown.addEventListener("change", async (e) => {
  const filtru = e.target.value.toLowerCase();
  filtruAn = filtru;
  // const movies = await fetchData();
  console.log(filtruAn);
});

console.log(filtruStele);

// var intvalue = Math.floor( floatvalue );
// var intvalue = Math.round( floatvalue );

// ------------PARTEA DE FILTRE --------------

filtruButton.addEventListener("click", async () => filtrare());

async function filtrare() {
  const movies = await fetchData();
  console.log(filtruCategorie);

  let moviesFiltered;

  if (filtruCategorie === "all") {
    moviesFiltered = movies;
  } else {
    moviesFiltered = movies.filter((movie) => {
      if (movie.category.toLowerCase().search(filtruCategorie) !== -1) {
        return true;
      }
      return false;
    });
  }

  let starsFiltered;

  if (filtruStele === "all") {
    starsFiltered = moviesFiltered;
  } else {
    starsFiltered = moviesFiltered.filter((movie) => {
      console.log(
        movie.rating,
        "rating",
        Math.floor(movie.rating),
        "floor",
        Math.round(movie.rating),
        "round"
      );
      if (Math.round(movie.rating) == filtruStele) {
        return true;
      }
      return false;
    });
  }

  let yearsFiltered;

  if (filtruAn === "all") {
    yearsFiltered = starsFiltered;
  } else {
    yearsFiltered = starsFiltered.filter((movie) => {
      console.log(movie.year, "an");
      if (movie.year == filtruAn) {
        return true;
      }
      return false;
    });
  }

  console.log(yearsFiltered);

  displayCard(yearsFiltered);
  // displayCard(starsFiltered);
  // displayCard(moviesFiltered);
}

// ------------PARTEA DE SEARCH --------------
// -- partea teorettica
let textCautat = "fas";
let text = "Fast and furious";
let position = text.search("fas");

const x = [{ title: "fast" }, { title: "fast 2" }].filter((el) => {
  let amGasit = el.title.search(textCautat);
  if (amGasit !== -1) {
    return true;
  } else {
    return false;
  }
});

console.log(x);

// -- partea practica

const searchElem = document.getElementById("searchInput");
console.log(searchElem);

let introducedText = "nothing to search yet";
console.log(introducedText);

const searchText = searchElem.addEventListener("input", async (e) => {
  const text = e.target.value.toLowerCase();
  introducedText = text;
  // const movies = await fetchData();
  console.log(introducedText);

  async function searchMovie() {
    const data = await fetchData();

    const returnedMovies = data.filter((el) => {
      let amGasit = el.title.toLowerCase().search(introducedText);

      console.log(el, el.title, amGasit);

      if (amGasit !== -1) {
        return true;
        // return displayCard(el);
      } else {
        return false;
      }
    });

    console.log(returnedMovies);
    displayCard(returnedMovies);
  }

  searchMovie();
});

// -----PARTEA PRINCIPALA

async function fetchData() {
  return await fetch("http://localhost:3002/movies").then((response) =>
    response.json()
  );
}

async function main() {
  const data = await fetchData();
  console.log("data", data);
  displayCard(data);
  console.log("containerMovies", containerMovies);

  const filtru = "Action";

  let moviesFiltered;

  if (filtru === "") {
    moviesFiltered = data.filter((movie) => {
      console.log(
        "aici in filtru",
        movie,
        " = movie db",
        movie.category,
        " = movie.category db",
        filtru,
        " = filtru"
      );
      return movie.category === filtru;
    });
  } else {
    moviesFiltered = data;
    console.log("moviesFiltered = data");
  }
  displayCard(moviesFiltered);
  console.log("moviesFiltered", moviesFiltered);
}

main();

function displayCard(data) {
  containerMovies.innerHTML = "";
  data.forEach((element) => {
    containerMovies.innerHTML += `
    <div class="movie-card" id="${element.id}">
            <div class="movie-head">
              <img src="${element.image}" alt="" class="card-img">
            </div>
            <div class="card-body overview"  >
              <h3 class="card-title">Title: ${element.title}</h3>
              <div class="card-info">
                <div class="category">Genre: ${element.category}</div>
                <div class="rating">Rating: ${element.rating}</div>
                <div class="year">Year: ${element.year}</div>`;
  });
}

// function displayCard(data) {
//   containerMovies.innerHTML = "";
//   data.forEach((element) => {
//     containerMovies.innerHTML += `
//     <div class="card">
//             <img
//               src="${element.image}"
//             />
//             <div class="detalii">
//               <div class="butoane">
//                 <button class="vizionare" id="vizionare">
//                   <img
//                     class="icon"
//                     src="/player vizionare.png"
//                     alt="play"
//                   />Vizioneaza
//                 </button>
//                 <button class="trailer" id="trailer">
//                   <img
//                     class="icon"
//                     src="/player vizionare.png"
//                     alt="trailer"
//                   />Trailer
//                 </button>
//               </div>
//               <h3>Titlu: ${element.title}</h3>
//               <p class="regizorFilm">Regizor: ${element.director}</p>
//               <p class="categorieFilm" >Categorie: ${element.category}</p>
//               <p class="anFilm">Anul: ${element.year}</p>
//               <p class="ratingFilm">Rating: ${element.rating}/5</p>
//               <p class="durataFilm">Durata: ${element.duration}</p>
//             </div>
//           </div>`;
//   });
// }
