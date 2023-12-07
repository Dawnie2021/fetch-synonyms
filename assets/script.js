var wordInput = document.getElementById("word");
var searchButton = document.getElementById("fetch-button");
var synonyms = document.getElementById("synonyms");
var result1 = document.getElementById("result1");
var result2 = document.getElementById("result2");
var result3 = document.getElementById("result3");
const synth = window.speechSynthesis;
var wordList = document.querySelector(".word-list");

function searchWord() {
  var word = wordInput.value;
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/` + word)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data[0].synonyms);
      result1.innerHTML = data[0].meanings[0].synonyms[0] || data[0].meanings[1].synonyms[0] || data[0].meanings[2].synonyms[0] 
      result2.innerHTML = data[0].meanings[0].synonyms[1] || data[0].meanings[1].synonyms[1] || data[0].meanings[2].synonyms[1] 
      result3.innerHTML = data[0].meanings[0].synonyms[2] || data[0].meanings[1].synonyms[2] || data[0].meanings[2].synonyms[2] 
    });
}
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  searchWord();
});

function displaySynonyms(data) {
  displayResults[2];
}


function resultSpeak(element) {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }
  console.log(element);
  const utterThis = new SpeechSynthesisUtterance(element.textContent);
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
