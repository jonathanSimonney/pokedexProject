//load functions script in Html!!!

var pokemonList = getPokemonList();
var arrayPokemon = [];

window.onload = function () {
    for (var i in pokemonList){
        arrayPokemon[i-1] =pokemonList[i]['name'];//Because JSON begins at 1, and array at 0
    }

    document.forms["searchPokemon"].onsubmit = function () {
        var userInput = this.pokeInfo.value.capitalizeFirstLetter();
        showPokemon(userInput);
        return false;
    }
};