const palabras = ["cocacola", "fernet", "coderhouse", "independiente"]; //aca cree un array con 4 elementos
let palabraSecreta = ""; //creo una variable vacia para definir la palabra que se va a elegir
let palabraMostrada = ""; //creo otra variable vacia para mostrar la palabra
let intentosRestantes = 10; //otra variable para definir la cantidad de intentos
let letrasAdivinadas = []; //creo un array vacio para ir completando con las letras de la palabra



// Función para elegir la palabra al azar con el metodo mathfloor
function elegirPalabra(lista) {
  const indice = Math.floor(Math.random() * lista.length);
  console.log(lista[indice] + "funcion de elegir palabra"); //borrar luegooooo
  console.log("la canrtidad de palabras que tiene el array es" + lista.length);
  return lista[indice];
}

// Función para mostrar la palabra con letras adivinadas y guiones
function mostrarPalabra(palabra, letras) {
  let resultado = "";
  for (let i = 0; i < palabra.length; i++) {
    if (letras.includes(palabra[i])) {
      resultado += palabra[i];
    } else {
      resultado += "__"+" "+" ";
    }
    
  }
  console.log(resultado + "funcion de mostrar palabra"); //borrar luego
  return resultado;
}

// Función para verificar si la letra está en la palabra
function verificarLetra(letra, palabra) {
    console.log(palabra.includes(letra) + "funcion de verificar letra"); //borrar luego
  return palabra.includes(letra);
}

// Función principal del ahorcado
function jugarTurno() {
  while (intentosRestantes > 0 && palabraMostrada.includes("_")) { //mientras tenga intentos disponibles y la palabla aun tenga letras por adivinar
    let letra = prompt(`Palabra: ${palabraMostrada}\nIntentos restantes: ${intentosRestantes}\nIngrese una letra:`);
    if (!letra) return; // si cancela o deja vacío sin ingresar nada

    letra = letra.toLowerCase(); //cree este metodo, para que toda letra que ingrese el jugador la convierta en minuscula

    if (!letrasAdivinadas.includes(letra)) { //si la letra que se ingresa no esta incluida en las que ya estan, se va agregando mediante el push
      letrasAdivinadas.push(letra); 

      if (verificarLetra(letra, palabraSecreta)) {
        palabraMostrada = mostrarPalabra(palabraSecreta, letrasAdivinadas);
        alert("¡Bien! La letra está en la palabra.");
      } else {
        intentosRestantes--;
        alert("La letra no está en la palabra."); //si la letra no se encuentra en la palabra, se van restando los intentos
      }
    } else {
      alert("Ya ingresaste esa letra, probá con otra.");
    }
  }
}

//Función que muestra el resultado final
function mostrarResultado() {
  if (!palabraMostrada.includes("_")) {
    alert(`¡Ganaste! La palabra era "${palabraSecreta}".`); //muestro al jugador el mensaje si gano o perdio, y mediante ${} muestro el valor de la palabra
  } else {
    alert(`¡Perdiste! La palabra era "${palabraSecreta}".`);
  }
}

//Programa principal del juego
palabraSecreta = elegirPalabra(palabras);
alert(`La palabra tiene ${palabraSecreta.length} caracteres.`);
palabraMostrada = mostrarPalabra(palabraSecreta, letrasAdivinadas);
jugarTurno();      // Inicia el juego completo
mostrarResultado(); // Muestra si ganó o perdió el jugador
