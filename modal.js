// esse arquivo serve para colocar inteligência no modal da página
const overlay = document.getElementById('modal');
const background = document.getElementById('modal-background');

//função que será chamada quando clicar:
function backgroundClickHandler() {
    //retirando o elemento css que deixa o modal visível:
    overlay.classList.remove('modal-open');
}

// criando uma ação para quando clicar sobre o elemento background:
background.addEventListener('click', backgroundClickHandler);