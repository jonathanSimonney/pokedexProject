String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function getPokemonList(){
    var ret ='';
    var request = new XMLHttpRequest();
    request.open("GET", 'assets/pokemonList.json', false);//
    request.onload = function(e) {
        ret = JSON.parse(request.responseText);
    };
    request.send();
    return ret;
}

function searchId(what, where, how){
    var ret;
    if (how === 'id'){
        ret = what;
    }else{
        ret = where.indexOf(what);
    }

    return parseInt(ret)+1;//Because JSON begins at 1, and array at 0
}

function getSearchMethod(userInput) {
    var searchMethod;
    if (isNaN(userInput)){
        searchMethod = "name";
    }else{
        searchMethod = "id";
    }
    return searchMethod;
}

function getPokemon(userInput) {
    var searchMethod = getSearchMethod(userInput);
    return pokemonList[searchId(userInput, arrayPokemon, searchMethod)];
}

function showErrorMessage(userInput){
    var errorMessage;
    var searchMethod = getSearchMethod(userInput);
    if (searchMethod === "id"){
        errorMessage = "Pokemon number "+userInput;
    }else{
        errorMessage = userInput;
    }
    errorMessage += " not found";

    document.querySelector(".errorMessage").innerHTML = errorMessage;
}

function showPokemon(userInput) {
    var pokemonToShow = getPokemon(userInput);
    if (pokemonToShow === undefined){
        showErrorMessage(userInput);
    }else{
        //TODO do this function once div are in place...
    }
    console.log(pokemonToShow);
}

//TODO separate code in two (or more) files, showing that it is not to reduce code length beyond 120 lines, but to better organise it
var pokemonList = getPokemonList();
var arrayPokemon = [];

window.onload = function () {
    for (var i in pokemonList){
        arrayPokemon[i-1] =pokemonList[i]['name'];//Because JSON begins at 1, and array at 0
    }

    document.forms["searchPokemon"].onsubmit = function () {
        var userInput = this.pokeInfo.value.capitalizeFirstLetter()
        showPokemon(userInput);
        return false;
    }
};


//Todo suppress the following after checking no line is longer!
//maxLength aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa