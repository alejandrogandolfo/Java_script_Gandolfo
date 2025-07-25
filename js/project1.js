
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


let historialGuardado = localStorage.getItem("historial");
let historial = [];
if (historialGuardado) {
  historial = JSON.parse(historialGuardado);
}

const descripcion = document.getElementById("descripcion");
const palabraContenedor = document.getElementById("palabra");
const teclado = document.getElementById("teclado");
const mensaje = document.getElementById("mensaje");
const intentosTexto = document.getElementById("intentos");
const botonReiniciar = document.getElementById("reiniciar");
const historialContenedor = document.getElementById("historial");


const botonBorrarHistorial = document.createElement("button");
botonBorrarHistorial.textContent = "Borrar historial";
botonBorrarHistorial.addEventListener("click", () => {
  localStorage.removeItem("historial");
  historial = [];
  mostrarHistorial();
});
historialContenedor.parentElement?.appendChild(botonBorrarHistorial); 

function elegirPalabra(lista) {
  const indice = Math.floor(Math.random() * lista.length);
  return lista[indice];
}

function mostrarPalabra(palabra, letras) {
  let resultado = "";
  for (const letra of palabra) {
    if (letras.includes(letra)) {
      resultado += letra + " ";
    } else {
      resultado += "_ ";
    }
  }
  return resultado;
}

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

function manejarIntento(letra) {
  if (letrasAdivinadas.includes(letra) || intentosRestantes <= 0) return;
  letrasAdivinadas.push(letra);
  const acierto = palabraSecreta.includes(letra);
  palabraContenedor.textContent = mostrarPalabra(palabraSecreta, letrasAdivinadas);
  if (!acierto) intentosRestantes--;
  guardarEstado();
  actualizarEstadoJuego();
}

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
    new Audio('js/audios/winner.mp3').play();
    mensaje.textContent = `Crack ¡Ganaste! La palabra era "${palabraSecreta}".`;
    historial.push(palabraSecreta);
    localStorage.setItem("historial", JSON.stringify(historial)); 
    mostrarHistorial();
    desactivarTeclado();
    limpiarEstado();
  } else if (perdio) {
    new Audio('js/audios/derrota.mp3').play();
    mensaje.textContent = `x.x ¡Perdiste! La palabra era "${palabraSecreta}".`;
    palabraContenedor.textContent = palabraSecreta.split("").join(" ");
    desactivarTeclado();
    limpiarEstado();
  } else {
    mensaje.textContent = "";
  }
}

function desactivarTeclado() {
  teclado.querySelectorAll("button").forEach(btn => btn.disabled = true);
}

function iniciarJuego() {
  const estadoGuardado = JSON.parse(localStorage.getItem("estadoJuego"));

  if (estadoGuardado) {
    palabraSecreta = estadoGuardado.palabraSecreta;
    pistaActual = estadoGuardado.pistaActual;
    letrasAdivinadas = estadoGuardado.letrasAdivinadas;
    intentosRestantes = estadoGuardado.intentosRestantes;
  } else {
    const seleccion = elegirPalabra(palabras);
    palabraSecreta = seleccion.texto;
    pistaActual = seleccion.pista;
    letrasAdivinadas = [];
    intentosRestantes = 10;
    guardarEstado();
  }

  descripcion.textContent = `Pista: ${pistaActual} | La palabra tiene ${palabraSecreta.length} letras.`;
  palabraContenedor.textContent = mostrarPalabra(palabraSecreta, letrasAdivinadas);
  mensaje.textContent = "";
  intentosTexto.textContent = `Intentos restantes: ${intentosRestantes}`;
  crearTeclado();
  mostrarHistorial();
}

function guardarEstado() {
  localStorage.setItem("estadoJuego", JSON.stringify({ 
    palabraSecreta,
    pistaActual,
    letrasAdivinadas,
    intentosRestantes
  }));
}

function limpiarEstado() {
  localStorage.removeItem("estadoJuego");
}

function mostrarHistorial() {
  historialContenedor.innerHTML = `<h4>Palabras adivinadas:</h4><ul>${historial.map(p => `<li>${p}</li>`).join("")}</ul>`;
}

botonReiniciar.addEventListener("click", () => {
  limpiarEstado();
  iniciarJuego();
});

iniciarJuego();
