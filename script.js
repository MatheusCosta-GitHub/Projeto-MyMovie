// esse arquivo é responsável pela inteligência da página com um todo

const searchButton = document.getElementById('search-button');


function searchButtonClickHandler(){
    //atribuindo o elemento css que deixa o elemento visível:
    overlay.classList.add('modal-open');
}


// criando uma ação para quando clicar sobre o botão de pesquisa:
searchButton.addEventListener('click', searchButtonClickHandler);