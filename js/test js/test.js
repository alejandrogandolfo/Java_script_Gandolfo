// Array de objetos, se me ocurrio darle un valor como la pista de la palabra, para poder crear un array de objetos
const palabras = [
  { texto: "cocacola", pista: "Bebida gaseosa" },
  { texto: "fernet", pista: "Se mezcla con coca" },
  { texto: "coderhouse", pista: "Cursos online" },
  { texto: "independiente", pista: "Club de Avellaneda" }
];

let palabraSecreta = "";
let pistaActual = "";
let letrasAdivinadas = [];
let intentosRestantes = 10;

const descripcion = document.getElementById("descripcion");
const palabraContenedor = document.getElementById("palabra");
const teclado = document.getElementById("teclado");
const mensaje = document.getElementById("mensaje");
const intentosTexto = document.getElementById("intentos");
const botonReiniciar = document.getElementById("reiniciar");

// Elegir palabra y pista al azar
function elegirPalabra(lista) {
  const indice = Math.floor(Math.random() * lista.length);
  return lista[indice];
}

// Mostrar palabra con guiones o letras descubiertas
function mostrarPalabra(palabra, letras) {
  let resultado = "";
  for (const letra of palabra) {
    if (letras.includes(letra)) {
      resultado += letra + " ";
    } else {
      resultado += "_";
    }
  }
  return resultado;
}

// Crear teclado dinámico
function crearTeclado() {
  const abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  teclado.innerHTML = "";
  abecedario.split("").forEach(letra => {
    const boton = document.createElement("button");
    boton.textContent = letra;
    boton.addEventListener("click", () => manejarIntento(letra.toLowerCase()));
    teclado.appendChild(boton);
  });
}

// Manejar intento del jugador
function manejarIntento(letra) {
  if (letrasAdivinadas.includes(letra) || intentosRestantes <= 0) return;

  letrasAdivinadas.push(letra);
  const acierto = palabraSecreta.includes(letra);

  palabraContenedor.textContent = mostrarPalabra(palabraSecreta, letrasAdivinadas);

  if (!acierto) intentosRestantes--;

  actualizarEstadoJuego();
}

// Actualizar estado del juego (ganó, perdió o sigue)
function actualizarEstadoJuego() {
  let gano = true;

  for (const letra of palabraSecreta) {
    if (!letrasAdivinadas.includes(letra)) {
      gano = false;
      break;
    }
  }

  const perdio = intentosRestantes <= 0;

  intentosTexto.textContent = `Intentos restantes: ${intentosRestantes}`;

  if (gano) {
    new Audio('js/audios/winner.mp3').play(); //SI BIEN NO LO VIMOS EN CLASE, LE QUICE AGREGAR SONIDO CUANDO GANA O PIERDE, INVESTIGANDO, DESCRGUE 2 ARCHIVOS MP3 Y LOS HICE FUNCIONAR CON EL new audio
    mensaje.textContent = `Crack ¡Ganaste! La palabra era "${palabraSecreta}".`;
    desactivarTeclado();
  } else if (perdio) {
    new Audio('js/audios/derrota.mp3').play();
    mensaje.textContent = `x.x ¡Perdiste! La palabra era "${palabraSecreta}".`;
    palabraContenedor.textContent = palabraSecreta.split("").join(" ");
    desactivarTeclado();
  } else {
    mensaje.textContent = "";
  }
}

// QUERIA DESACTIVAR LOS BOTONES DEL TECLADO UNA VEZ FINALICE EL JUEGO, BUSQUE INFORMACION ADICIONAL PARA PODER HACERLO
function desactivarTeclado() {
  teclado.querySelectorAll("button").forEach(btn => btn.disabled = true);
}

// Reinicia el juego completo
function iniciarJuego() {
  const seleccion = elegirPalabra(palabras);
  palabraSecreta = seleccion.texto;
  pistaActual = seleccion.pista;

  letrasAdivinadas = [];
  intentosRestantes = 10;

  descripcion.textContent = `Pista: ${pistaActual} | La palabra tiene ${palabraSecreta.length} letras.`;
  palabraContenedor.textContent = mostrarPalabra(palabraSecreta, letrasAdivinadas);
  mensaje.textContent = "";
  intentosTexto.textContent = `Intentos restantes: ${intentosRestantes}`;
  crearTeclado();
}

// Evento para botón de reinicio
botonReiniciar.addEventListener("click", iniciarJuego);

// Iniciar juego al cargar
iniciarJuego();
