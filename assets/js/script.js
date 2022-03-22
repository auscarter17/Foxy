// access landing page
var landingPageEl = document.querySelector("#landing-page");
// access card page
var cardPageEl = document.querySelector("#card-page");
// access saved card page
var savedPageEl = document.querySelector("#saved-page");
//access landing page start button
var startCardBtnEl = document.querySelector("#start-card");
// access check button
var checkBtnEl = document.querySelector("#checkBtn");
// access cross button
var crossBtnEl = document.querySelector("#crossBtn");
// access saved Foxes
var savedBtnEl = document.querySelector("#savedFoxes");

// global variable to save foxes
var savedFoxes = [];

// global bio 
var foxBio = "";

// TODO CHANGE BIO AND ADD TO CARDS
var bio = [
   "Enjoys long walks on any beach where there may be chickens.",

   "I'm not like other foxes, I'm a totally authentic fur real free spirit.",

   "Most well known for jumping over the lazy dog.",

   "Retired spaceship pilot, now a professional fighter.",

   "You can usually find me hanging out with my best friend, a very fast hedgehog.",

   "I always have a hard time making decisions, I can be a little fennecy.",

   "Everyone keeps asking me what I say, I don't get it.",

   "Oh, you said FAUX fur, that's a huge relief.",

   "You may recognize me from the hit video game Minecraft.",

   "My favorite show is Paw & Order."
]

// on load, show landing elements and hide card elements
function landingShow() {
   landingPageEl.className = "show";
   cardPageEl.className = "hide";

   loadCards();

   console.log(savedFoxes)
}

// function to build each card
function buildCard() {
   // access card text div container
   var cardTextEl = document.querySelector("#card-text");
   // access card image div container
   var cardImgEl = document.querySelector("#fox-image-container");

   // clear both sides of card
   cardTextEl.innerHTML = "";
   cardImgEl.innerHTML = "";

   // hide the landing elements
   landingPageEl.className = "hide";
   // show the card elements
   cardPageEl.className = "show";

   // call the API's to generate the card information
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

   // call cardBio function to assign a bio
   cardBio();

   // the bio for the fox card
   var bio = foxBio;

   // create an object to pass into card generation function
   var tempObj = {
      "title": title,
      "first": firstName,
      "last": lastName,
      "age": age,
      "city": city,
      "state": state,
      "bio": bio
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
function buildCardText(dataObj) {

   // var to access element to hold card
   var cardRowEl = document.querySelector(".flip-card-back");

   // create element to card
   var cardBodyEl = document.createElement("div");
   cardBodyEl.classList = "fox-details";

   var cardLogo = document.createElement("img");
   cardLogo.setAttribute("style", "max-height: 60px");
   cardLogo.src = "./assets/images/smallFox.png";
   cardBodyEl.appendChild(cardLogo);


   // create name element for card
   var cardNameEl = document.createElement("h5");
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


   // create bio element for card
   var cardBioEl = document.createElement("span");
   cardBioEl.setAttribute("id", "card-bio");
   cardBioEl.classList = "fox-bio";
   cardBioEl.textContent = dataObj.bio;
   cardBodyEl.appendChild(cardBioEl);

   // add card to the card div element
   cardRowEl.appendChild(cardBodyEl);
}

// function to iterate through the bio array
function cardBio() {
   var tempArr = "";
   tempArr = bio.shift();
   foxBio = tempArr;
   bio.push(tempArr);

}


// function to append the image to the image container div element
function buildCardImg(imageLink) {
   // get the image container div
   var imageContainerEl = document.querySelector("#fox-image-container");
   // create an image element
   var foxImgEl = document.createElement("img");
   // set the id of the image for access purposes
   foxImgEl.setAttribute("id", "fox-image");
   //TODO ADD STYLE CLASS
   /*foxImgEl.className =*/
   // set the source to the generated image link
   foxImgEl.src = imageLink;
   // add the image to the image container
   imageContainerEl.appendChild(foxImgEl);
}

// function to determine which button was clicked
function yesOrNo(event) {
   // get the id of the button that was clicked
   var targetId = event.target.getAttribute("id");

   if (event.target.classList.contains("button")) {
      // get the various data for saving
      // image link
      var cardImgLink = $("#fox-image").attr("src");
      // fox title, first and last name
      var cardName = $("#card-name").text();
      // fox age
      var cardAge = $("#card-age").text();
      // fox city
      var cardCity = $("#card-city").text();
      // fox state
      var cardState = $("#card-state").text();
      // fox bio
      var cardBio = $("#card-bio").text();

      // initialize a temp object
      var tempObj = {};
   

   // if check button was clicked
   if (targetId == "checkBtn") {
      tempObj = {
         "cardImgLink": cardImgLink,
         "cardName": cardName,
         "cardAge": cardAge,
         "cardCity": cardCity,
         "cardState": cardState,
         "cardBio": cardBio
      }

      // push the temp object to the global array
      savedFoxes.push(tempObj);

      // save the card details
      saveCard();
      // rebuild a new card
      buildCard();
      // if cross button was clicked
   } else {
      // rebuild a new card
      buildCard();
   }
}
}

// function to display saved cards
function displaySavedCards() {
   landingPageEl.classList = "hide";
   cardPageEl.classList = "hide";
   savedPageEl.classList = "show";

   // select the card columns element
   var savedCardsEl = document.querySelector(".saved-columns");

   // loop through global array
   for (var i = 0; i < savedFoxes.length; i++) {
      // create card body element
      var cardBodyEl = document.createElement("div");
      // assign style
      cardBodyEl.classList = "column saved-column is-two-fifths";

      // create card image element
      var cardImgEl = document.createElement("img");
      cardImgEl.src = savedFoxes[i].cardImgLink;
      cardImgEl.classList = "saved-card-img";
      cardBodyEl.appendChild(cardImgEl);

      // create card name element
      var cardNameEl = document.createElement("p");
      cardNameEl.classList = "saved-card-img";
      cardNameEl.textContent = savedFoxes[i].cardName;
      cardBodyEl.appendChild(cardNameEl);

      // create card age element
      var cardAgeEl = document.createElement("p");
      cardAgeEl.classList = "saved-card-age";
      cardAgeEl.textContent = savedFoxes[i].cardAge;
      cardBodyEl.appendChild(cardAgeEl);

      // create card city element
      var cardCityEl = document.createElement("p");
      cardCityEl.classList = "saved-card-city";
      cardCityEl.textContent = savedFoxes[i].cardCity;
      cardBodyEl.appendChild(cardCityEl);

      // create card state element
      var cardStateEl = document.createElement("p");
      cardStateEl.classList = "saved-card-state";
      cardStateEl.textContent = savedFoxes[i].cardState;
      cardBodyEl.appendChild(cardStateEl);

      var cardBioEl = document.createElement("p");
      cardBioEl.classList = "saved-card-bio";
      cardBioEl.textContent = savedFoxes[i].cardBio;
      cardBodyEl.appendChild(cardBioEl);

      // append card body to card container
      savedCardsEl.appendChild(cardBodyEl);
   }

}

// simple function to save the global array to localStorage
function saveCard() {
   localStorage.setItem("foxy", JSON.stringify(savedFoxes));
}

// simple function to load the localStorage into the global array
function loadCards() {
   savedFoxes = JSON.parse(localStorage.getItem("foxy"));

   if (savedFoxes === null) {
      savedFoxes = [];
   }
}

// event listener to show landing page on load
addEventListener("load", landingShow);
// event listener on start button (landing page) to move from landing page to card page
startCardBtnEl.addEventListener("click", buildCard);
// event listener on either check or cross button (card page) to either save data
// and display new card, or simply display a new card
cardPageEl.addEventListener("click", yesOrNo)
// display saved foxes
savedBtnEl.addEventListener("click", displaySavedCards);