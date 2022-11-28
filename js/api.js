

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) =>{
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) =>{
//primeiro uso de Requisição
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    /*Fetch retorna uma promessa de uma resposta e o método then chama a funcção pra manipular a resposta */

    return fetch(url) //Requisição HTTP para bsucar os pokemons
        .then( (response) => response.json())  //Arrow Function //retornando a   promise como resposta convertida em JSON
        .then( (jsonBody) => jsonBody.results) //resultado do body, corpo da reposta e usar ele no results
        .then( (pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        //peguei a lista dentro do json q são os pokemons e transformando em uma nova lista de promessas do detalhe do pokemon em JSON
        .then((detailRequests) => Promise.all(detailRequests))
        .then ((pokemonsDetails) => pokemonsDetails)
}


Promise.all([   //Lista de novas requisições
    fetch('https://pokeapi.co/api/v2/pokemon/1'),
    fetch('https://pokeapi.co/api/v2/pokemon/2'),
    fetch('https://pokeapi.co/api/v2/pokemon/3'),
    fetch('https://pokeapi.co/api/v2/pokemon/4')

]) .then(results => {
    console.log(results)
})

