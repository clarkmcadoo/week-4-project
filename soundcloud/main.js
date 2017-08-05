/*
  Here is a guide for the steps you could take:
*/

// 1. First select and store the elements you'll be working with

var player = document.querySelector(".player");
var searchForm = document.querySelector(".search-form");
var musicPlayer = document.querySelector(".music-player");
var results = document.querySelector(".results");
var searchBarInput = document.querySelector("#search-bar");
var submit = document.querySelector(".submit");
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
        for (let i = 0; i < data.length; i++) {
          createArtist(data[i]);
        }
        initializeMusicPlayer(data);
      });
  }

  var searchResultsText = document.createElement("h3");
  results.appendChild(searchResultsText);
  searchResultsText.innerHTML = "Search Results:";

  // 4. Create a way to append the fetch results to your page

  function createArtist(array) {

    var artistProfile = document.createElement("div");
    results.appendChild(artistProfile);
    artistProfile.className = "artistProfile";
    artistProfile.value = array.stream_url;
    artistProfile.title = array.title;

    var artistJacket = document.createElement("img");
    artistProfile.appendChild(artistJacket);
    if (array.artwork_url == null) {
      artistJacket.src =
        "http://www.publicdomainpictures.net/pictures/40000/velka/question-mark.jpg";
    } else {
      artistJacket.src = array.artwork_url;
    }
    // artistJacket.src = array.artwork_url;
    artistJacket.id = array.user.username;
    artistJacket.value = array.stream_url;
    artistJacket.title = array.title;

    var artistTitle = document.createElement("p");
    artistProfile.appendChild(artistTitle);
    artistTitle.innerHTML = array.title;
    artistTitle.id = array.user.username;
    artistTitle.value = array.stream_url;
    artistTitle.title = array.title;

    var artistName = document.createElement("h3");
    artistProfile.appendChild(artistName);
    artistName.innerHTML = array.user.username;
    artistName.id = array.user.username;
    artistName.value = array.stream_url;
    artistName.title = array.title;
  }

  // 5. Create a way to listen for a click that will play the song in the audio play

  function initializeMusicPlayer(dataArray) {
    trackNumber = document.querySelectorAll(".artistProfile");

    for (i = 0; i < trackNumber.length; i++) {
      trackNumber[i].addEventListener("click", playMusic);
    }

    function playMusic() {
      var playerText = document.querySelector(".player-text");
      if(playerText.childNodes.length >= 1){
      playerText.removeChild(playerText.childNodes[0]);
      }else{ console.log("OK!")}
      var content = null;


      console.log("nowplayingtext", nowPlayingText);

      content = event.target;

      var nowPlayingText = document.createElement("h5");
      playerText.appendChild(nowPlayingText);
      nowPlayingText.innerHTML =
        "Now Playing: " + content.title + "  by  " + content.id;

      musicPlayer.src = content.value + client;
      console.log("nowplayingtext", nowPlayingText);

  }
}
}
