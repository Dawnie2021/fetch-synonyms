var wordInput = document.getElementById("word");
var searchButton = document.getElementById("fetch-button");
var synonyms = document.getElementById("synonyms");
var synth = window.speechSynthesis;
var wordList = document.querySelector("#results");
var searchList = document.querySelector("#search-list");
var themes = ['success', 'danger', 'info', 'warning', 'dark'];
var searchArray = [];

function searchWord(word) {

  // var word = wordInput.value;
  searchArray.push(word);
  localStorage.setItem("Search List", JSON.stringify(searchArray))

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/` + word)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      wordList.innerHTML = null;
      for (var meaning of data[0]?.meanings || []) {
        if (!meaning.synonyms.length) continue;
        for (var synonym of meaning?.synonyms || []) {
          if (meaning.synonyms.indexOf(synonym) >= 5) break;
          var liEl = document.createElement("li");
          var type = themes[meaning.synonyms.indexOf(synonym)];
          liEl.className = "list-group-item list-group-item-" + type + " d-flex justify-content-between align-items-center";
          liEl.id = "result-" + synonym;

          var h3El = document.createElement("h3");
          h3El.textContent = synonym;

          var buttonEl = document.createElement("button");
          buttonEl.className = "btn btn-primary btn-sm";
          buttonEl.textContent = "Click";

          liEl.append(h3El, buttonEl);
          wordList.append(liEl);
        }
      }
      getLocalStorage();
      if (!wordList.innerHTML || data.title) {
        var h3El = document.createElement("h3");
        h3El.className = "text-center";
        h3El.textContent = data.title || "Synonym not found";
        wordList.appendChild(h3El);
      }
    });


}
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  var word = wordInput.value;
  searchWord(word);
});

function displaySynonyms(data) {
  displayResults[2];
  // if (!data) return;
}


function resultSpeak(element) {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }

  var utterThis = new SpeechSynthesisUtterance(element.textContent);
  utterThis.voice = synth.getVoices().find(function (v) {
    return v.name === "Aaron";
  });

  utterThis.onend = function () {
    for (var button of wordList.querySelectorAll("button")) {
      button.disabled = false;
    }
  };

  utterThis.onerror = function (error) {
    console.error(error);
  };

  synth.speak(utterThis);
}

wordList.addEventListener("click", function (e) {
  var element = e.target;
  for (var button of wordList.querySelectorAll("button")) {
    button.disabled = true;
  }
  if (element.matches("button")) {
    resultSpeak(element.previousElementSibling);
  }
});

function getLocalStorage() {
  var arr = JSON.parse(localStorage.getItem("Search List")) || [];
  for (let i = 0; i < arr.length; i++) {
    var searchBtn = document.createElement("button");
    searchBtn.innerHTML = arr[i];
    searchBtn.setAttribute("class", "seach-btn");
    searchList.appendChild(searchBtn);
  }
}

function displayWord(event) {
  event.preventDefault();
  var element = event.target.innerHTML;


  searchWord(element);
}

searchList.addEventListener("click", displayWord);
// getLocalStorage();