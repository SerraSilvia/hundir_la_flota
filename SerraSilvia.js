import { Tablero } from './src/controllers/tablero.js';

const barcosJSON = [
    { "name": "Portaaviones", "size": 5 },
    { "name": "Acorazado", "size": 4 },
    { "name": "Crucero", "size": 3 },
    { "name": "Submarino", "size": 3 },
    { "name": "Destructor", "size": 2 }
];

//instanciamos el tablero de la IA
let tableroIA = new Tablero(10, barcosJSON);
tableroIA.generarTablero();
tableroIA.generarBarcos();

//instanciamos el tablero del jugador
let tableroJugador = new Tablero(10, barcosJSON, true);
tableroJugador.generarTablero();
document.addEventListener('keydown', (event) => {
    if (event.key === 'R' || event.key === 'r') {
        if(tableroJugador)
            tableroJugador.rotarBarco();
    }
});

