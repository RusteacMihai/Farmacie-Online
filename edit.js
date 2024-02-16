const getForm = document.getElementById("addForm");
console.log(getForm);

const getTitle = document.getElementById("title");
const getDirector = document.getElementById("director");
const getImage = document.getElementById("image");
const getVideo = document.getElementById("video");
const getCategory = document.getElementById("category");
const getRating = document.getElementById("rating");
const getDuration = document.getElementById("duration");
const getYear = document.getElementById("year");
const getEditButton = document.getElementById("editButton");
const getDeleteButton = document.getElementById("deleteButton");

let introducedTitle = "no title yet";
let introducedDirector = "no director yet";
let introducedImage = "no image yet";
let introducedVideo = "no video yet";
let introducedCategory = "no Category yet";
let introducedRating = 0;
let introducedDuration = 0;
let introducedYear = 0;

getTitle.addEventListener("input", async (ev) => {
  const textToAdd = ev.target.value;
  introducedTitle = textToAdd;

  // console.log(introducedTitle);
});

getDirector.addEventListener("input", async (ev) => {
  const textToAdd = ev.target.value;
  introducedDirector = textToAdd;
});

getImage.addEventListener("input", async (ev) => {
  const textToAdd = ev.target.value;
  introducedImage = textToAdd;
  console.log(introducedImage);
});

getVideo.addEventListener("input", async (ev) => {
  const textToAdd = ev.target.value;
  introducedVideo = textToAdd;
});

getCategory.addEventListener("input", async (ev) => {
  const textToAdd = ev.target.value;
  introducedCategory = textToAdd;
});

getRating.addEventListener("input", async (ev) => {
  const textToAdd = ev.target.value;
  introducedRating = textToAdd;
});

getDuration.addEventListener("input", async (ev) => {
  const textToAdd = ev.target.value;
  introducedDuration = textToAdd;
});

getYear.addEventListener("input", async (ev) => {
  const textToAdd = ev.target.value;
  introducedYear = textToAdd;
});

// ADUC DINAMIC FILMELE IN DROPDOWN FILTRU DUPA TITLU
const getMovieTitle = document.getElementById("movieTitle");

getMovieTitle.addEventListener("click", mainTitle());

// const selectedMovie = getMovieTitle.addEventListener("change", async (e) => {
//   console.log(e.target.value);
//   const filtru = e.target.value.toLowerCase();
//   filtruCategorie = filtru;
//   // const movies = await fetchData();
//   console.log(filtruCategorie);
// });

let filtruCategorie = "all";

console.log(filtruCategorie);

console.log(getTitle.value);
console.log(getTitle);

let displayTitle = getTitle.value;

console.log(displayTitle);

let selectedId = 0;

async function mainTitle() {
  const data = await fetchData();

  let fitruMovieTitle = "";
  data?.forEach((element) => {
    getMovieTitle.innerHTML += `
    <option value="${element.id}" >${element.title}/${element.year}</option>`;
    // console.log(element.title, element.id);

    getMovieTitle.addEventListener("change", async (e) => {
      const clickedMovie = e.target.value; // .toLowerCase()
      selectedId = clickedMovie;
      // const movies = await fetchData();
      // console.log(selectedId);

      if (element.id == selectedId) {
        console.log(
          "YES!!!",
          "selectedId = ",
          selectedId,
          element.id,
          element.title
        );
        getTitle.value = element.title;
        getDirector.value = element.director;
        getImage.value = element.image;
        getVideo.value = element.video;
        getCategory.value = element.category;
        getRating.value = element.rating;
        getDuration.value = element.duration;
        getYear.value = element.year;

        introducedTitle = element.title;
        introducedDirector = element.director;
        introducedImage = element.image;
        introducedVideo = element.video;
        introducedCategory = element.category;
        introducedRating = element.rating;
        introducedDuration = element.duration;
        introducedYear = element.year;
        console.log(
          introducedTitle,
          "with selectedId FINAL!!!!!= ",
          selectedId
        );
      } else {
        console.log(
          "..",
          "selectedId = ",
          selectedId,
          element.id,
          element.title
        );
      }
    });
  });
}

// console.log(selectedMovie); // IESE UNDEFIEND

// getbttn.addEventListener("submit", editMovie(selectedId));

getEditButton.addEventListener("click", (e) => editMovie(e, selectedId));

async function editMovie(e, id) {
  // const data = await fetchData();
  // console.log("data", data[0], data[12]);
  // event.preventDefault();
  // console.log(selectedId);

  // dataToUpdate = {  title: introducedTitle, ...

  e.preventDefault(); // opreste sa ia by default selectedId = 0;

  try {
    const response = await fetch(`http://localhost:3002/movies/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: introducedTitle,
        director: introducedDirector,
        image: introducedImage,
        video: introducedVideo,
        category: introducedCategory,
        rating: introducedRating,
        duration: introducedDuration,
        year: introducedYear,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    // .then((json) => alert(JSON.stringify(json)));

    console.log(introducedImage, introducedYear, `${id}`, selectedId);
    // console.log(response.json()); // --> 2 erori :)
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to update data.");
    }

    // .then((response) => response.json())
    // .then((json) => alert(JSON.stringify(json)))
    // .catch((error) => console.log(error));
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
}

getDeleteButton.addEventListener("click", (e) => deleteMovie(e, selectedId));

async function deleteMovie(e, id) {
  e.preventDefault(); // opreste sa ia by default selectedId = 0;
  try {
    const response = await fetch(`http://localhost:3002/movies/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error("Failed to delete data.");
    }
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}

// main();

// -- partea principala

async function fetchData() {
  return await fetch("http://localhost:3002/movies").then((response) =>
    response.json()
  );
}

// async function main2() {
//   const data = await fetchData();
//   console.log("data", data, data[0]);
// }

// main2();

// OPTIONAL: am ramas aici !! incerc sa afisez datele selectate dupa title on click
// asta  e fct copiata din movies.js
// async function afisare() {
//   const movies = await fetchData();
//   console.log(fitruMovieTitle);

//   let moviesFiltered;

//   if (fitruMovieTitle === "all") {
//     moviesFiltered = movies;
//   } else {
//     moviesFiltered = movies.filter((movie) => {
//       if (movie.category.toLowerCase().search(fitruMovieTitle) !== -1) {
//         return true;
//       }
//       return false;
//     });
//   }
// }

// let formData = new FormData(getForm);
// console.log(formData);

// let data = Object.fromEntries(formData);
// console.log(data);

// POATE FI SELECTAT MOVIE BY YEAR DAR NU E FTE  OK DE UTILIZAT -- NU STII CE MOVIE SELECTEZI --

// const getMovieYear = document.getElementById("movieYear");

// getMovieYear.addEventListener("click", mainYear());

// async function mainYear() {
//   const data = await fetchData();

//   let fitruMovieTitle = "";
//   data?.forEach((element) => {
//     getMovieYear.innerHTML += `
//     <option value="${element.id}" >${element.year}</option>`;
//     // console.log(element.title, element.id);

//     getMovieYear.addEventListener("change", async (e) => {
//       const clickedYear = e.target.value; // .toLowerCase()
//       selectedId = clickedYear;
//       // const movies = await fetchData();
//       // console.log(selectedId);

//       if (element.id == selectedId) {
//         console.log(
//           "YES!!!",
//           "selectedId = ",
//           selectedId,
//           element.id,
//           element.title
//         );
//         getTitle.value = element.title;
//         getDirector.value = element.director;
//         getImage.value = element.image;
//         getVideo.value = element.video;
//         getCategory.value = element.category;
//         getRating.value = element.rating;
//         getDuration.value = element.duration;
//         getYear.value = element.year;

//         introducedTitle = element.title;
//         introducedDirector = element.director;
//         introducedImage = element.image;
//         introducedVideo = element.video;
//         introducedCategory = element.category;
//         introducedRating = element.rating;
//         introducedDuration = element.duration;
//         introducedYear = element.year;
//         console.log(
//           introducedTitle,
//           "with selectedId FINAL!!!!!= ",
//           selectedId
//         );
//       } else {
//         console.log(
//           "..",
//           "selectedId = ",
//           selectedId,
//           element.id,
//           element.title
//         );
//       }
//     });
//   });
// }
