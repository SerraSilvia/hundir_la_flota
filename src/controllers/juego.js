export class GestorJuego {
    tableroJugador;
    tableroIA;
    turnoIA = false;
    celdasUsadasPorIA = new Set();

    constructor() { }

    setTableros(tableroJugador, tableroIA) {
        this.tableroJugador = tableroJugador;
        this.tableroIA = tableroIA;
    }

    mostrarJugar() {
        const btn = document.querySelector('#jugar');
        if (btn) {
            btn.style.display = 'inline-block';
            btn.addEventListener('click', () => {
                this.comenzarJuego();
            });
        }
    }

    comenzarJuego() {
        this.turnoIA = false;

        // Quitar botón jugar
        const btn = document.querySelector('#jugar');
        if (btn) btn.remove();

        // Mostrar mensaje
        this.mostrarMensaje("¡Comienza la partida! Dispara en el tablero de la IA.");
    }

    mostrarMensaje(texto) {
        const zonaMensajes = document.querySelector("#mensajes");
        if (zonaMensajes) {
            zonaMensajes.textContent = texto;
        }
    }

    checkFinDeJuego() {
        const todosHundidos = (barcos) => barcos.every(barco => barco.posiciones.length === 0);

        if (todosHundidos(this.tableroIA.barcosAnadidos)) {
            this.mostrarMensaje("🎉 ¡Has ganado!");
            this.deshabilitarClicks();
        } else if (todosHundidos(this.tableroJugador.barcosAnadidos)) {
            this.mostrarMensaje("💀 Has perdido. La IA ha ganado.");
            this.deshabilitarClicks();
        }
    }

    deshabilitarClicks() {
        document.querySelectorAll('#ia #tablero .celda').forEach((celda) => {
            const nuevoCelda = celda.cloneNode(true);
            celda.parentNode.replaceChild(nuevoCelda, celda);
        });
    }

    turnoIAIA() {
        const posibles = [];

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const clave = `${i}-${j}`;
                const celda = document.querySelector(`#jugador #tablero [id='${clave}']`);
                if (!celda.classList.contains('disparado')) {
                    posibles.push({ x: i, y: j });
                }
            }
        }

        if (posibles.length === 0) return; // Fin del juego (opcional)

        const disparo = posibles[Math.floor(Math.random() * posibles.length)];
        const celda = document.querySelector(`#jugador #tablero [id='${disparo.x}-${disparo.y}']`);
        celda.classList.add('disparado');

        const resultado = window.tableroJugador.recibirAtaque(disparo.x, disparo.y);

        if (resultado === 'agua') {
            celda.textContent = '💧';
            window.turnoIA = false;
        } else {
            celda.textContent = '💥';
    
            if (window.tableroJugador.todosBarcosHundidos()) {
                alert("La IA ha ganado.");
                this.deshabilitarClicks();
                return;
            }
    
            setTimeout(() => this.turnoIAIA(), 800);
        }
    }

    deshabilitarClicks() {
        document.querySelectorAll('.celda').forEach(celda => {
            celda.style.pointerEvents = 'none';
        });
    }
}
