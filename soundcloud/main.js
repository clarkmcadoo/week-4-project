/*
  Here is a guide for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
var container = document.querySelector(".container");
var header = document.querySelector("h1");
var player = document.querySelector(".player");
var musicPlayer = document.querySelector(".music-player");
var search = document.querySelector(".search");
var searchForm = document.querySelector(".search-form");
var results = document.querySelector(".results");
var searchBarInput = document.querySelector("#search-bar");
var submit = document.querySelector(".submit");
submit.addEventListener("click", createPageURL);
console.log(searchBarInput.value);
// submit = event.preventDefault();

(function() {
  // 2. Create your `onSubmit` event for getting the user's search term
  function submitMessage() {
    alert("Getting the User's search term");
  }
});

  // 3. Create your `fetch` request that is called after a submission
function createPageURL(){
  event.preventDefault();
  var baseURL = "https://api.soundcloud.com/users/";
  var userInput = searchBarInput.value;
  var searchResult = userInput.replace(" ","+");
  var client = "?client_id=8538a1744a7fdaa59981232897501e04";
  var url1 = baseURL + searchResult + client;

fetch (url1).then(function(response1){
  return response1.json();
})
.then(function(firstData){
  console.log(firstData);
 searchedUserID = firstData.id;
 console.log(searchedUserID);
 return searchedUserID;
});

  var tracksUrl = baseURL + searchedUserID + "/tracks" + client;
  
  fetch(
    tracksUrl
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data.results);
      var artistInfo = data.results;
      for (let i = 0; i < 15; i++) {
        createArtist(data[i]);
      }
    });

  // 4. Create a way to append the fetch results to your page
  var nowPlayingText = document.createElement("h5");
  player.appendChild(nowPlayingText);
  nowPlayingText.innerHTML = "Now Playing:" /* + */;

  var searchResultsText = document.createElement("h3");
  results.appendChild(searchResultsText);
  searchResultsText.innerHTML = "Search Results:";

  function createArtist(array) {
    var artistProfile = document.createElement("div");
    results.appendChild(artistProfile);

    var artistJacket = document.createElement("img");
    artistProfile.appendChild(artistJacket);
    artistJacket.src = array.artwork_url;
    artistJacket.id = "artist-img";

    var artistTitle = document.createElement("p");
    artistProfile.appendChild(artistTitle);
    artistTitle.innerHTML = array.title;
    artistTitle.id = "artist-title";

    var artistName = document.createElement("h3");
    artistProfile.appendChild(artistName);
    artistName.innerHTML = array.user.username;
    artistName.id = "artist-name";
  }
};
  // 5. Create a way to listen for a click that will play the song in the audio play
