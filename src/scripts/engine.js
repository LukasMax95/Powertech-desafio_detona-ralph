const state = {
    vews: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time"),
        score: document.querySelector("#score"),
        status: document.querySelector("#button")
    },
    values: {
        gameSpeed:1000,
        hitPosition: null,
        result: 0,
        currentTime: 60
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countdownTimerId: setInterval(countdown, 1000)
    }
}

function countdown(){
    let pontos = state.values.result;
    if(state.values.currentTime < 0){
        state.vews.status.textContent = ('O tempo acabou!' +
        `\nO seu escore é de ${pontos} ponto${(pontos === 1) ? "":"s"}`);
        alert("Reiniciar Jogo?");
        clearInterval(state.actions.countdownTimerId);
        clearInterval(state.actions.timerId);
    }else{
        state.vews.status.textContent = "Rodando";
        state.values.currentTime--;
        if(state.values.currentTime >= 0){
            state.vews.timeLeft.textContent = state.values.currentTime;
        }
    }
}

function hitSound(target){
    let audio = new Audio(`./src/sounds/${target}.wav`);
    audio.play();
}
/*
function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameSpeed)
}
*/
function randomSquare(){
    state.vews.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.vews.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListnerHitbox(){
    state.vews.squares.forEach((square)=>{
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                hitSound("hit");
            }
            state.vews.score.textContent = state.values.result;
            state.values.hitPosition = null;
        });
    });
}
function resetListener(){
    if(state.vews.status.textContent != "Rodando"){
        state.vews.status.forEach((stats)=>{
            stats.addEventListener("mousedown", () => {
                clearInterval(state.actions.countdownTimerId);
                clearInterval(state.actions.timerId);
                alert("Reiniciar Jogo?");
            });
        });
    }
}

function init(){
    //moveEnemy();
    addListnerHitbox();
    resetListener();
}

init();