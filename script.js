
const html = document.querySelector("html")
const botonCorto = document.querySelector(".app__card-button--corto")
const botonEnfoque = document.querySelector(".app__card-button--enfoque")
const botonLargo = document.querySelector(".app__card-button--largo")
const banner = document.querySelector(".app__image")
const titulo = document.querySelector(".app__title")
const botones = document.querySelectorAll(".app__card-button")
const inputEnfoqueMusica = document.querySelector("#alternar-musica")
const musica = new Audio("./sonidos/feid-quiero.mp3")
const botonIniciarPausar = document.querySelector("#start-pause")
const musicaPlay = new Audio("./sonidos/play.wav")
const musicaPause = new Audio("./sonidos/pause.mp3")
const musicaFinalizar = new Audio("./sonidos/beep.mp3")
const textoIniciarPausar = document.querySelector("#start-pause")
const tiempoEnPantalla = document.querySelector("#timer")


let tiempoTranscurridoEnSegundo = 1500
let idIntervalo = null


musica.loop = true



inputEnfoqueMusica.addEventListener("change",()=>   {
    if(musica.paused)   {
        musica.play()
    }else   {
        musica.pause()
    }
})


botonCorto.addEventListener("click", () =>  {
    let valorCorto = prompt("¡Que tiempo desea descansar? Ingrese su tiempo en segundos")
    tiempoTranscurridoEnSegundo = valorCorto
    cambiarContexto ("descanso-corto")
    botonCorto.classList.add("active")
})


botonEnfoque.addEventListener("click", () => {
    let valorCorto = prompt("¡Que tiempo desea descansar? Ingrese su tiempo en segundos")
    tiempoTranscurridoEnSegundo = valorCorto
    cambiarContexto ("enfoque")
    botonEnfoque.classList.add("active")
})

botonLargo.addEventListener("click", () =>  {
    let valorCorto = prompt("¡Que tiempo desea descansar? Ingrese su tiempo en segundos")
    tiempoTranscurridoEnSegundo = valorCorto
    cambiarContexto ("descanso-largo")
    botonLargo.classList.add("active")
} )

//funcion cambiar texto  e imagen ---------------------------------------------------------------------------------
function cambiarContexto (contexto)     {
    mostrarTiempo()

    botones.forEach(function(contexto)  {
        contexto.classList.remove("active")
      })

    html.setAttribute("data-contexto",contexto)
    banner.setAttribute("src",`./imagenes/${contexto}.png`)

    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `A trabajar con más chispa y menos cháchara,<br>
            <strong class="app__title-strong">¡Productividad en acción!.</strong>`
            break;

        case "descanso-corto":
            titulo.innerHTML = `Respira hondo, 
            <strong class="app__title-strong">¡Un break rápido y vuelves al ataque!</strong>`

            break
        
        case "descanso-largo":
            titulo.innerHTML = `Un respiro largo para una mente brillante,
            <strong class="app__title-strong">¡Tus ideas esperan!</strong>`

            break
    
        default:
            break;
    }
}
//------------------------------------------------------------------------------------------------


const cuentaRegresiva = ()=>    {
    if(tiempoTranscurridoEnSegundo <= 0)    {
        musicaFinalizar.play()
        alert("Tiempo finalizado")
        reiniciar()
        return
    }
    textoIniciarPausar.textContent ="Pausar"
    tiempoTranscurridoEnSegundo -= 1
   mostrarTiempo()
}

botonIniciarPausar.addEventListener("click",iniciarPausar )

function iniciarPausar()    {
    if(idIntervalo) {
        musicaPause.play()
        reiniciar()
        return
    }
    
    musicaPlay.play()
    idIntervalo = setInterval(cuentaRegresiva,1000)
}

function reiniciar()    {
    clearInterval(idIntervalo)
    textoIniciarPausar.textContent = "Comenzar"
    iconoIniciarPausar.setAttribute("src",`/imagenes/play_arrow.png`)
    idIntervalo = null

}

function mostrarTiempo()    {
    const tiempo = new Date(tiempoTranscurridoEnSegundo * 1000)
    const tiempoFormateado = tiempo.toLocaleTimeString("es-CO", {minute:"2-digit", second:"2-digit"})
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}

mostrarTiempo()

