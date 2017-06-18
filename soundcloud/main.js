/*
  Here is a guide for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
var container = document.querySelector(".container");
var header = document.querySelector("h1");
var player = document.querySelector(".player");
var search = document.querySelector(".search");
var searchForm = document.querySelector(".search-form");

var musicPlayer = document.querySelector(".music-player");
var results = document.querySelector(".results");
var searchBarInput = document.querySelector("#search-bar");
var submit = document.querySelector(".submit");
var listOfTracks = [];
var client = "?client_id=8538a1744a7fdaa59981232897501e04";
var baseURL = "https://api.soundcloud.com/users/";
var trackNumber = [];


// 2. Create your `onSubmit` event for getting the user's search term

submit.addEventListener("click", createPageURL);

// 3. Create your `fetch` request that is called after a submission
function createPageURL() {
  event.preventDefault();
  var userInput = searchBarInput.value;
  var searchResult = userInput.replace(" ", "+"); //need to correct this.
  var url1 = baseURL + searchResult + client;

  fetch(url1)
    .then(function(response1) {
      return response1.json();
    })
    .then(function(firstData) {
      searchedUserID = firstData.id;
      findUserTracks(searchedUserID);
      console.log(searchedUserID);
    });

  function findUserTracks(userIDNum) {
    var tracksUrl = baseURL + userIDNum + "/tracks" + client;
    fetch(tracksUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
      // initializeMusicPlayer(data);        
        for (let i = 0; i < data.length; i++) {
          createArtist(data[i]);
          listOfTracks.push(data[i].stream_url);
        }
      initializeMusicPlayer(data);                
      })
  }

  // 4. Create a way to append the fetch results to your page

  function createArtist(array) {
    var artistProfile = document.createElement("div");
    results.appendChild(artistProfile);
    artistProfile.className = "artistTracks";
    artistProfile.value = array.stream_url;
    artistProfile.title = array.title;

    var artistJacket = document.createElement("img");
    artistProfile.appendChild(artistJacket);
    artistJacket.src = array.artwork_url;
    artistJacket.id = "artist-img";
    artistJacket.value = array.stream_url;
    artistJacket.title = array.title;
    

    var artistTitle = document.createElement("p");
    artistProfile.appendChild(artistTitle);
    artistTitle.innerHTML = array.title;
    artistTitle.id = "artist-title";
    artistTitle.value = array.stream_url;
    artistTitle.title = array.title;
    
    
    var artistName = document.createElement("h3");
    artistProfile.appendChild(artistName);
    artistName.innerHTML = array.user.username;
    artistName.id = "artist-name";
    artistName.value = array.stream_url;
    artistName.title = array.title;
    
    
  };


// 5. Create a way to listen for a click that will play the song in the audio play

function initializeMusicPlayer(dataArray){

musicPlayer.src = dataArray[0].stream_url+client;
trackNumber = document.querySelectorAll(".artistTracks");

for (i=0; i<trackNumber.length; i++){
    trackNumber[i].addEventListener("click", playMusic)
};

function playMusic(){
    var content = event.target;
    console.log(content.title);
    console.log(content.value);

  var nowPlayingText = document.createElement("h5");
  player.appendChild(nowPlayingText);
  nowPlayingText.innerHTML = "Now Playing: " + content.title + "  by  " + content.innerHTML;
};



var searchResultsText = document.createElement("h3");
results.appendChild(searchResultsText);
searchResultsText.innerHTML = "Search Results:";

// var trackNumber = document.querySelectorAll("div.artistTracks");  
// console.log(trackNumber);


};

};