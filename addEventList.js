const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const descansoLongo = document.querySelector(".app__card-button--longo");
const tempoNaTela = document.getElementById("timer");
const banner = document.querySelector(".app__image");
const botoes = document.querySelectorAll(".app__card-button");
const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("/Fokus-projeto-base/sons/luna-rise-part-one.mp3");
const startPauseBt = document.querySelector("#start-pause");
const iniciarOuPausarBt = document.querySelector("#start-pause span")
const audioPlay = new Audio('/Fokus-projeto-base/sons/play.wav');
const audioPausa = new Audio('/Fokus-projeto-base/sons/pause.mp3');
const audioTempoFinalizado = new Audio('/Fokus-projeto-base/sons/beep.mp3')
const bannerPausePlay = document.querySelector('.app__card-primary-butto-icon')
let intervaloId = null;
musica.loop = true;
musica.volume = 0.5;
let textChange = document.querySelector(".app__title");
let contexto;
let tempoDecorridoEmSegundos = 1500;
const duracaoFoco = 1500;
const duracaoDescansoCurto = 300;
const duracaoDescansoLongo = 900;

// Evento que utilizamos para trabalhar com inputs é o "change" ;
musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500
  alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

descansoLongo.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900
  alterarContexto("descanso-longo");
  descansoLongo.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempo()
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/Fokus-projeto-base/imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      textChange.innerHTML = `Otimize sua produtividade,<br>
      <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;

    case "descanso-curto":
      textChange.innerHTML = `Que tal dar uma respirada?<strong class="app__title-strong">Faça uma pausa curta</strong>`;
      break;

    case "descanso-longo":
      textChange.innerHTML = `Hora de voltar para a superficie.<strong class="app__title-strong"> Faça uma pausa longa! </strong>`;

    default:
      break;
  }
}

const contagemRegressiva = () => {
  if(tempoDecorridoEmSegundos <= 0){ 
    audioTempoFinalizado.play()
      alert('Tempo finalizado!')
      zerar()
      return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener("click", iniciar)

function iniciar() {
  if(intervaloId){
    audioPausa.play()
    zerar()


    return
  }
  audioPlay.play()  
  intervaloId = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarBt.textContent = "Pausar"
  bannerPausePlay.setAttribute("src", '/Fokus-projeto-base/imagens/pause.png')
 
}

function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;
  iniciarOuPausarBt.textContent = "Começar"
  bannerPausePlay.setAttribute("src", '/Fokus-projeto-base/imagens/play_arrow.png')
}

function mostrarTempo () {
  const tempo = new Date (tempoDecorridoEmSegundos * 1000)
  const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
  tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
