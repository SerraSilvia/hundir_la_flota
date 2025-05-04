import { Tablero } from './src/controllers/tablero.js';
import { GestorJuego } from './src/controllers/juego.js';

const barcosJSON = [
    { "name": "Portaaviones", "size": 5 },
    { "name": "Acorazado", "size": 4 },
    { "name": "Crucero", "size": 3 },
    { "name": "Submarino", "size": 3 },
    { "name": "Destructor", "size": 2 }
];

//instanciamos el tablero de la IA
let tableroIA = new Tablero(10, barcosJSON);
let tableroJugador = new Tablero(10, barcosJSON, true);

let juego = new GestorJuego();
juego.setTableros(tableroJugador, tableroIA);

tableroJugador.setGestorJuego(juego);
tableroIA.setGestorJuego(juego);

tableroJugador.generarTablero();
tableroIA.generarTablero();
tableroIA.generarBarcos();

document.addEventListener('keydown', (event) => {
    if (event.key === 'R' || event.key === 'r') {
        if(tableroJugador)
            tableroJugador.rotarBarco();
    }
});

window.tableroIA = tableroIA;
window.tableroJugador = tableroJugador;
window.juego = juego;
window.turnoIA = false;