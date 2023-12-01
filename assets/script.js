var wordInput = document.getElementById("word");
var searchButton = document.getElementById("fetch-button");
var synonyms = document.getElementById("synonyms");

apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/<word>`

fetch (`https://api.dictionaryapi.dev/api/v2/entries/en/<word>`)
.then(function(response){
return response.json();
}
)
.then(function (data){
    getSynonyms("word");
}
)