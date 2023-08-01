// esse arquivo serve para colocar inteligência no modal da página
const background = document.getElementById('modal-background');
const modalContainer = document.getElementById('modal-container');


//criando a função que cria o modal:
function createModal(data) {
    modalContainer.innerHTML= `                
        <div id="movie-title">
            <h2>${data.Title}</h2>
        </div>

        <section id="modal-body">

            <img id="movie-poster"
                src="${data.Poster}"
                alt="Poster do filme" />

            <div id="movie-info">

                <h3 id="movie-plot">

                    ${data.Plot}

                </h3>

                <div id="movie-cast">

                    <h4>Elenco:</h4>
                    <h5>${data.Actors}</h5>

                </div>

                <div id="movie-genre">

                    <h4>Gênero:</h4>
                    <h5>${data.Genre}</h5>

                </div>

            </div>

        </section>

        <section id="modal-footer">
 
            <button id="add-to-list" onclick='{addToList(${JSON.stringify(data).replace("'", "`")})}'>Adicionar a lista</button>

        </section>

        </section>`
}

//função que será chamada quando clicar:
function backgroundClickHandler() {
    //retirando o elemento css que deixa o modal visível:
    overlay.classList.remove('modal-open');
}

// criando uma ação para quando clicar sobre o elemento background:
background.addEventListener('click', backgroundClickHandler);