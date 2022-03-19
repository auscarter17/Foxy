var landingPageEl = document.querySelector("#landing-page");
var cardPageEl = document.querySelector("#card-page");
var startCardBtnEl = document.querySelector("#start-card");
var checkBtnEl = document.querySelector("#checkBtn");
var crossBtnEl = document.querySelector("#crossBtn");

var savedFoxes = [];

var bio = [
   "I enjoy breadcrumb lattes from StarDucks",

   "I never mind splitting the bill",

   "I loved rom-coms! My favorite is Love Quacktually",

   "If you're under 2 feet tall or a goose please don't quack me",

   "Looking for someone to sweep me off my webbed feet",

   "Feather? I HARDLY KNOW 'ER! But I'd like to know you better",

   "Enjoys long walks at the local park",

   "If you wanna talk just message me, don't be a chicken. Seriously, please no chickens",

   "Living life a day at a time, I'm just winging it, baby",

   "I just want someone to make me fall mallardly in love with them"
]

function landingShow() {
   landingPageEl.className = "show";
   cardPageEl.className = "hide";
}
function buildCard() {
   var cardTextEl = document.querySelector("#card-text");
   var cardImgEl = document.querySelector("#fox-image-container");

   cardTextEl.innerHTML = "";
   cardImgEl.innerHTML = "";

   landingPageEl.className = "hide";
   cardPageEl.className = "show";

   nameGen();
   imageGen();
}

// function to fetch api for random bio generation
function nameGen() {
   var apiUrl = "https://randomuser.me/api/?nat=us";

   // fetch data
   fetch(apiUrl).then(function (response) {
      if (response.ok) {
         response.json().then(function (data) {
            // pass data to be extracted
            pullData(data);
         });
      }
   })
      // handle api error
      .catch(function (error) {
         alert("Unable to connect to name generator API.");
      })
}

// function to fetch api for random fox image
function imageGen() {
   var apiUrl = "https://randomfox.ca/floof";

   // fetch data
   fetch(apiUrl).then(function (response) {
      if (response.ok) {
         response.json().then(function (data) {
            // pass data to be extracted
            pullImage(data);
         });
      }
   })
      // handle api error
      .catch(function (error) {
         alert("Unable to connect to name generator API.");
      })
}

// this function is used to pull all the required data from the api call
function pullData(data) {
   // title of fox (Mr./Mrs./Dr. etc.)
   var title = data.results[0].name.title;
   // first name of fox
   var firstName = data.results[0].name.first;
   // last name of fox
   var lastName = data.results[0].name.last;
   // age of fox
   var age = data.results[0].dob.age;
   // where fox lives
   var city = data.results[0].location.city;
   var state = data.results[0].location.state;

   // create an object to pass into card generation function
   var tempObj = {
      "title": title,
      "first": firstName,
      "last": lastName,
      "age": age,
      "city": city,
      "state": state
   }

   // call to generate card text
   buildCardText(tempObj);
}

// function to pull image link 
function pullImage(data) {
   // image link
   var imageLink = data.image;
   buildCardImg(imageLink);
   return imageLink;
}

// function used to generate all the text for each fox card
// TODO
function buildCardText(dataObj) {
   // var to access element to hold card
   var cardRowEl = document.querySelector(".flip-card-back");

   // create element to card
   var cardBodyEl = document.createElement("p");

   // create name element for card
   var cardNameEl = document.createElement("p");
   cardNameEl.setAttribute("id", "card-name");
   cardNameEl.textContent = dataObj.title + " " + dataObj.first + " " + dataObj.last;
   cardBodyEl.appendChild(cardNameEl);

   // create age element for card
   var cardAgeEl = document.createElement("p");
   cardAgeEl.setAttribute("id", "card-age");
   cardAgeEl.textContent = dataObj.age;
   cardBodyEl.appendChild(cardAgeEl);

   // create city element for card
   var cardCityEl = document.createElement("p");
   cardCityEl.setAttribute("id", "card-city")
   cardCityEl.textContent = dataObj.city;
   cardBodyEl.appendChild(cardCityEl);

   // create state element for card
   var cardStateEl = document.createElement("p");
   cardStateEl.setAttribute("id", "card-state");
   cardStateEl.textContent = dataObj.state;
   cardBodyEl.appendChild(cardStateEl);

   cardRowEl.appendChild(cardBodyEl);
}

function buildCardImg(imageLink) {
   var imageContainerEl = document.querySelector("#fox-image-container");
   var foxImgEl = document.createElement("img");

   foxImgEl.setAttribute("id", "fox-image");
   //TODO ADD STYLE CLASS
   /*foxImgEl.className =*/ 
   foxImgEl.src = imageLink;
   imageContainerEl.appendChild(foxImgEl);
}

function yesOrNo(event) {
   var targetId = event.target.getAttribute("id");
   var cardImgLink = $("#fox-image").attr("src");
   var cardName = $("#card-name").text();
   var cardAge = $("#card-age").text();
   var cardCity = $("#card-city").text();
   var cardState = $("#card-state").text();

   var tempObj = {};

   if (targetId == "checkBtn") {
      tempObj = {
         "cardImgLink": cardImgLink,
         "cardName": cardName,
         "cardAge": cardAge,
         "cardCity": cardCity,
         "cardState": cardState
      }

      savedFoxes.push(tempObj);
      console.log(savedFoxes);
      
      saveCard();
      buildCard();
   } else {
      buildCard();
   }
}

function saveCard() {
   localStorage.setItem("foxy", JSON.stringify(savedFoxes));
}

function loadCards() {
   savedFoxes = JSON.parse(localStorage.getItem("foxy"));
   console.log(savedFoxes);
}

addEventListener("load", landingShow);
addEventListener("load", loadCards);
startCardBtnEl.addEventListener("click", buildCard);
cardPageEl.addEventListener("click", yesOrNo)