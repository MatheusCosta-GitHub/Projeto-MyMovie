// esse arquivo é responsável pela inteligência da página com um todo
const overlay = document.getElementById('modal');
const searchButton = document.getElementById('search-button');
const movieName = document.getElementById('movie-name');
const movieYear = document.getElementById('movie-year');

const movieListContainer = document.getElementById('movie-list');

//ou ele começa a lista vazia ou começa com o que tinha armazenado no localStorage:
let movieList = JSON.parse(localStorage.getItem('movieList')) ?? [];

// função que confere se a caixa de nome do filme está vazia ou não:
function adaptMovieName() {

    if (movieName.value === '') {

        //retorna um erro: 
        throw new Error('O nome do filme deve ser informado!');
    }
    return movieName.value.split(' ').join('+');
}

//função que confere se a caixa de ano está vazia ou não:
function adaptMovieYear() {
    // tratando os dados enviados no input do ano do filme:
    if (movieYear.value === '') {
        return '';
    }

    if (movieYear.value.length !== 4 || Number.isNaN(Number(movieYear.value))) {
        throw new Error('Ano do filme inválido!');
    }

    return `&y=${movieYear.value}`;
}

async function searchButtonClickHandler() {

    try {
        //atribuindo o elemento css que deixa o elemento visível:
        overlay.classList.add('modal-open');
        let url = `http://www.omdbapi.com/?apikey=441b6882&t=${adaptMovieName()}${adaptMovieYear()}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.Error) {
            throw new Error('Filme não encontrado!');
        }

        createModal(data);
        overlay.classList.add('modal-open');

    } catch (error) {
        notie.alert({
            type: 'error',
            text: error.message
        });
    }

}

//função que alimenta a lista da página:
function addToList(data) {

    if (isThisFilmAlreadyOnTheList(data.imdbID)){
        notie.alert({
            type: 'error',
            text: 'Filme já está na lista'
        })
        return;
    }

    movieList.push(data);
    //chamando a função que atualiza a inteface:
    updateUI(data);
    updateLocalStorage();
}

function updateUI(data) {
    movieListContainer.innerHTML +=`
    <article id='movie-catalog-imdbID${data.imdbID}'>

        <img 
        src="${data.Poster}"
        alt="${data.Title}"/>

        <button class="remove-button" onclick='{removeFilmFromList("${data.imdbID}")}'><i class="bi bi-trash"></i>Remover</button>

    </article>
    `
    overlay.classList.remove('modal-open');
}

//função que verifica se o filme já está na lista:
function isThisFilmAlreadyOnTheList(imdbID){
    
    function verifyList(data){
        return imdbID == data.imdbID;
    }

    return movieList.find(verifyList);
}

//função que remove filmes da lista:
function removeFilmFromList(imdbID){
    //usando uma arrow function para filtrar elementos da lista:
    movieList = movieList.filter((movie) => movie.imdbID !== imdbID);
    //removendo um elemento pelo seu ID:
    document.getElementById(`movie-catalog-imdbID${imdbID}`).remove();
    updateLocalStorage();
}

function updateLocalStorage(){
    //colocando no armazenamento do navegador, um objeto JSON que vai guardar as informações da lista:
    localStorage.setItem('movieList', JSON.stringify(movieList));
}

movieList.forEach(updateUI);

//criando uma ação para quando clicar sobre o botão de pesquisa:
searchButton.addEventListener('click', searchButtonClickHandler);