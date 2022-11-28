const pokemonList = document.getElementById('pokemonList') 
//Pega a lista em HTML
const buttoMore = document.getElementById('buttoMore')

const maxRecords = 151
const limit = 10
let offset = 0;



function convertPokemonToLi(pokemon){
    return `
    <li class="pokemon ${pokemon.type}">
         <span class="number">#${pokemon.number}</span>
         <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

        <img src="${pokemon.photo}"          
           alt="${pokemon.name}">
        </div>
    </li>
    `
}

function LoadPokemonItens(offset, limit){
   
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

            /*vai devolver uma string
            pra cada item recebe um elemento e converte em alguma coisa, a função.
        compor uma lista nova e essa lista nova concatenando todos elementos pra virar um novo html e dps colocar dentro do html manipulado pokemonList.innerHTML */
                
 
LoadPokemonItens(offset, limit)

buttoMore.addEventListener('click', () =>{
    offset += limit

    const qtdRegisterNextPage = offset + limit

    if(qtdRegisterNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        LoadPokemonItens(offset, newLimit)

        buttoMore.parentElement.removeChild(buttoMore) //remove o botão Pegar o elemento pai e remove ele
    }else{
        LoadPokemonItens(offset, limit)
    }

})
    



    



