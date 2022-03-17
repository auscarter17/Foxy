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

function nameGen() {
   var apiUrl = "https://randomuser.me/api/?nat=us";

   fetch(apiUrl).then(function (response) {
      if (response.ok) {
         response.json().then(function (data) {
            console.log(data);
            pullData(data);
         });
      }
   })
      .catch(function (error) {
         alert("Unable to connect to name generator API.");
      })
}

function pullData(data) {
   var title = data.results[0].name.title;
   var firstName = data.results[0].name.first;
   var lastName = data.results[0].name.last;
   var age = data.results[0].dob.age;
   var city = data.results[0].location.city;
   var state = data.results[0].location.state;

   var tempArray = [
      title, firstName, lastName, age, city, state
   ]

   console.log(tempArray)
}

function buildCard() {

}

nameGen();