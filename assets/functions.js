String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.minimalizeFirstLetter = function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
};

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

    if (userInput === ""){
        errorMessage = "You must enter a pokemon name or a pokemon id";
    }

    document.querySelector(".errorMessage").innerHTML = errorMessage;
}

function format(pokemonName, userInput){
    pokemonName = pokemonName.minimalizeFirstLetter();
    if (pokemonName === 'nidoran'){
        console.log(userInput);
        if (userInput == 28){
            pokemonName = 'nidoran-f';
        }else if(userInput == 31){
            pokemonName = 'nidoran-m';
        }else{
            pokemonName = 'nidoran-f';
        }
    }else if (pokemonName === 'mr. mime'){
        pokemonName = 'mr-mime';
    }else if (pokemonName === 'farfetch\'d'){
        pokemonName = 'farfetchd';
    }

    return pokemonName;
}

function addImage(pokemonName, userInput) {
    var imgToAdd = document.createElement('img');
    document.getElementById('displayImage').innerHTML = '';
    imgToAdd.alt = 'Picture of '+pokemonName;
    imgToAdd.src = 'http://img.pokemondb.net/artwork/'+format(pokemonName, userInput)+'.jpg';
    console.log(imgToAdd);
    document.getElementById('displayImage').appendChild(imgToAdd);
}

function showPokemon(userInput) {
    var pokemonToShow = getPokemon(userInput);
    if (pokemonToShow === undefined){
        showErrorMessage(userInput);
    }else{
        document.getElementById('name').innerHTML = 'Name : '+pokemonToShow['name'];
        document.getElementById('type').innerHTML = 'Type : '+pokemonToShow['type'];
        addImage(pokemonToShow['name'], userInput);
    }
    console.log(pokemonToShow);
}
