export class Partida {
    jugador;
    tableroIA;
    tableroJugador;

    setJugador(jugador) {
        this.jugador = jugador;
    }

    setTableroIA(tablero) {
        this.tableroIA = JSON.stringify(tablero);
    }

    setTableroJugador(tablero) {
        this.tableroJugador = JSON.stringify(tablero);
    }
}