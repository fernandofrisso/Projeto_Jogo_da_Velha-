// DADOS INCICIAIS

let square = {

    a1:'', a2:'', a3:'',
    b1:'', b2:'', b3:'',
    c1:'', c2:'', c3:''
   
};

let player = '';
let warning =  '';
let playing = false;

// EVENTOS

document.querySelector('.reset').addEventListener('click',reset)
document.querySelectorAll('.item').forEach(item => { // seleciono todos os itens, percoro cada item e adciono um evento de clique

    item.addEventListener('click',itemClick)
    
});


//FUNÇÕES

function itemClick(event){

    
    let item = event.target.getAttribute('data-item') //serve para saber qual quadrado eu estou (ai, b2 e etc)
    console.log(item)

    if(playing && square[item] === ''){ // se o jogo ta rolando e  o item for vazio coloco o 'x' ou o '0' que indicam quem é o jogador
 
        square[item] = player;

        renderSquare();
        togglePlayer(); // função que vai alternar o player
    }

}

function reset(){

    warning = "";

    let random = Math.floor(Math.random() * 2); // gero números aleatórios entre 0 e 1, sempre arredondando para baixo

    //serve para saber de qual jogador é a vez

    if(random === 0){

        player = 'x';

    } else {

        player = 'o';
    }

    // zerando o tabuleiro

    for (let i in square) { //faço um loop em cada quadrado do tabuleiro e zero ele 

        square[i] = '';

    }

    playing = true;

    renderSquare();

    renderInfo();

}

//preencher o quadro
function renderSquare(){

    for (let i in square) { //faço um loop em cada quadrado do tabuleiro e zero ele 

        let item = document.querySelector(`div[data-item=${i}]`);

        //verificando se tem algo preenchido no campo

        if(square[i]!==''){ //se n tiver algo preenchido, coloca o resultado do loop, caso contrário deixa vazio

            item.innerHTML = square[i];

        } else {

            item.innerHTML = "";
        }

    }

    checkGame()
};

//preencher a informação    

function renderInfo(){

    document.querySelector('.vez').innerHTML = player;

    document.querySelector('.resultado').innerHTML = warning

};

function togglePlayer(){ //função que vai alernar o player

    if(player === 'x'){

        player = 'o';

    }else{

        player = 'x'
    }

    renderInfo()
}

// função para checar as possibilidade de vitoria
function checkGame(){

    if(checkWinnerFor('x')){

        warning = ' O "x" venceu!';
        playing = false //pausa o jogo

    } else if (checkWinnerFor('o')){

        warning = ' O "o" venceu!';
        playing = false

    } else if (isFull()){

        warning = 'Deu empate!';
        playing = false

    } 

}

function checkWinnerFor(player){

    let pos = [   //serve para checar as possbilidades que podem levar a vitoria

    //possibilidade na horizontal
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',
    //possibilidade na vertical
    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',
   //possibilidade em cruzamento
    'a1,b2,c3',
    'a3,b2,c1'

    ] 

    for(let w in pos){

        let pArray = pos[w].split(',') // o split vai criar um array. Ex: ["a1", "a2", "a3"] - Lembrando que nesse caso será um loop que irá percorrer todas as possibilidades

        // função "every" = Basicamente, ele vai pegar todos os elementos da lista e se um dos elementos não satisfazerem a condição, o resultado será false. Basta que um não satisfaça, para retornar o falso
        // o every sempre é montado com uma função. No caso é "function()"
        
       let hasWon =  pArray.every(option => square [option] === player)//se a minha opção está preenchida com player (x ou O), eu retorno true, senão retorno false

              if(hasWon){

                return true

              }
    }

                return false

}


function isFull(){

    for(let i in square){

        if (square[i] === ''){ // se o meu square está vazio, retorna falso 

            return false
        }
    }   

    return true // se ele percorrer esse loop todo e não satisfazer a condição, é pq o quadro todo ta preenchdio


}