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

// const addTitleText = getTitle.addEventListener("change", async (e) => {
//   const text = e.target.value.toLowerCase();
//   introducedTitle = text;
//   // const movies = await fetchData();
//   console.log(introducedTitle, e.target);
// });

getForm.addEventListener("submit", handleSubmit);

let introducedTitle = "no title yet";
let introducedDirector = "no director yet";
let introducedImage = "no image yet";
let introducedVideo = "no video yet";
let introducedCategory = "no Category yet";
let introducedRating = "no Rating yet";
let introducedDuration = "no duration yet";
let introducedYear = "no year yet";

// getForm.addEventListener("submit", async (ev) => {
//   const textToAdd = ev.target.value;
//   introducedText = textToAdd;

//   console.log(introducedText);
// });

getTitle.addEventListener("input", async (ev) => {
  const textToAdd = ev.target.value;
  introducedTitle = textToAdd;

  console.log(introducedTitle);
});

getDirector.addEventListener("input", async (ev) => {
  const textToAdd = ev.target.value;
  introducedDirector = textToAdd;
});

getImage.addEventListener("input", async (ev) => {
  const textToAdd = ev.target.value;
  introducedImage = textToAdd;
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

let formData = new FormData(getForm);
console.log(formData);

let data = Object.fromEntries(formData);
console.log(data);

async function handleSubmit(event) {
  event.preventDefault();
  fetch("http://localhost:3002/movies", {
    method: "POST",
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
  })
    .then((response) => response.json())
    .then((json) => alert(JSON.stringify(json)))
    .catch((error) => console.log(error));
}

// -- partea principala

async function fetchData() {
  return await fetch("http://localhost:3002/movies").then((response) =>
    response.json()
  );
}

async function main() {
  const data = await fetchData();
  console.log("data", data, data[19]);
}

main();
// const getData = require("vc");
