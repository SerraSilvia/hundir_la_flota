import { Barco } from '../models/barco.model.js';

export class Tablero {
    dimensiones; // filas/columnas -> en nuestro caso 10
    celdasOcupadas;
    esJugador; // jugador o IA
    barcos = [];
    barcoSeleccionado = null;
    barcosAnadidos = [];
    orientacionBarcoSeleccionadoHorizontal = true;
    juego = null;
    ataquesRecibidos = [];

    constructor(dimensiones, barcos = [], esJugador = false) {
        this.dimensiones = dimensiones;
        this.celdasOcupadas = new Set();
        this.esJugador = esJugador;
        this.barcos = barcos;
        if (this.juego) this.juego.actualizarInfo();
    }

    generarTablero() {
        if (this.esJugador) {
            if (document.querySelector("#jugador #tablero-jugador #tablero"))
                document.querySelector("#jugador #tablero-jugador #tablero").remove();
        } else {
            if (document.querySelector("#ia #tablero"))
                document.querySelector("#ia #tablero").remove();
        }

        let tablero = document.createElement("div");
        tablero.id = "tablero";

        tablero.style.display = "inline-block";
        tablero.style.border = "1px solid black";

        for (let i = 0; i < this.dimensiones; i++) {
            for (let j = 0; j < this.dimensiones; j++) {
                let celda = document.createElement("div");
                celda.classList.add("celda");
                celda.id = `${i}-${j}`;

                celda.addEventListener('click', () => {
                    if (this.barcoSeleccionado) {
                        this.generarBarcoJugador(this.barcoSeleccionado, i, j);
                    }
                });

                tablero.appendChild(celda);
            }
        }
        if (this.esJugador) {
            this.generarBotonera();
            document.querySelector("#jugador #tablero-jugador").appendChild(tablero);
        } else {
            document.querySelector("#ia").appendChild(tablero);
        }


    }

    generarBotonera() {
        if (document.querySelectorAll('.botonera button').length > 0) {
            let botones = document.querySelectorAll('.botonera button');
            botones.forEach(boton => boton.remove());
        }

        for (let barco of this.barcos) {
            let button = document.createElement('button');
            button.setAttribute('id', 'barco' + barco.name);
            button.textContent = barco.name + '-' + barco.size;
            button.addEventListener('click', () => {
                document.querySelector('#barco' + barco.name).style.fontWeight = 'bold';
                this.insertarBarco(barco)
            });

            document.querySelector('.botonera').appendChild(button);
        }
    }

    generarBarcos() {
        this.barcos.forEach(barco => {
            const barcoInstancia = new Barco(barco.name, barco.size);
            this.generarBarcoIA(barcoInstancia);
        });
    }

    generarBarcoIA(barco) {
        let posicionOk = false;
        let posicionesTemporales = [];

        do {
            posicionOk = true;
            posicionesTemporales = [];

            var posicionX = Math.floor(Math.random() * 10);
            var posicionY = Math.floor(Math.random() * 10);

            var direccion = Math.floor(Math.random() * 4); // 0 horizontal izq, 1 horizontal derecha, 2 vertical arriba, 3 vertical abajo

            for (let i = 0; i < barco.size; i++) {
                let x = posicionX;
                let y = posicionY;

                switch (direccion) {
                    case 0: //izq
                        x = posicionX - i;
                        break;
                    case 1: //derecha
                        x = posicionX + i;
                        break;
                    case 2: //arriba
                        y = posicionY - i;
                        break;
                    case 3: //abajo
                        y = posicionY + i;
                        break;
                }

                if (x < 0 || x >= this.dimensiones || y < 0 || y >= this.dimensiones || this.celdasOcupadas.has(`${x}-${y}`)) {
                    posicionOk = false;
                } else {
                    posicionesTemporales.push({ x, y });
                }
            }

        } while (!posicionOk);

        barco.posiciones = posicionesTemporales;
        posicionesTemporales.forEach(pos => this.celdasOcupadas.add(`${pos.x}-${pos.y}`));
        this.barcosAnadidos.push(barco);
        //this.pintarBarco(barco);
    }

    generarBarcoJugador(barco, x = null, y = null) {
        let posicionOk = false;
        let posicionesTemporales = [];

        do {
            posicionOk = true;
            posicionesTemporales = [];

            var posicionX = x !== null ? x : Math.floor(Math.random() * this.dimensiones);
            var posicionY = y !== null ? y : Math.floor(Math.random() * this.dimensiones);

            var direccion = Math.floor(Math.random() * 4); // 0: izq, 1: der, 2: arriba, 3: abajo

            if (x !== null && y !== null) {
                direccion = this.orientacionBarcoSeleccionadoHorizontal ? 1 : 3;
            }

            for (let i = 0; i < barco.size; i++) {
                let tempX = posicionX;
                let tempY = posicionY;

                switch (direccion) {
                    case 0: // izquierda
                        tempX = posicionX - i;
                        break;
                    case 1: // derecha
                        tempX = posicionX + i;
                        break;
                    case 2: // arriba
                        tempY = posicionY - i;
                        break;
                    case 3: // abajo
                        tempY = posicionY + i;
                        break;
                }

                // Verificar si la posición está fuera del tablero o ya está ocupada
                if (
                    tempX < 0 || tempX >= this.dimensiones ||
                    tempY < 0 || tempY >= this.dimensiones ||
                    this.celdasOcupadas.has(`${tempX}-${tempY}`)
                ) {
                    posicionOk = false;
                    break;
                } else {
                    posicionesTemporales.push({ x: tempX, y: tempY });
                }
            }

            // Si no se pasan coordenadas, salir del bucle al encontrar una posición válida
            if (x === null && y === null) break;

        } while (!posicionOk && x === null && y === null);

        // Si la posición es válida, registrar el barco
        if (posicionOk) {
            barco.posiciones = posicionesTemporales;
            posicionesTemporales.forEach(pos => this.celdasOcupadas.add(`${pos.x}-${pos.y}`));
            this.barcosAnadidos.push(barco);
            this.pintarBarco(barco);

            // Actualizamos el mensaje de info al colocar todos los barcos
            this.actualizarInfo();

            if (this.barcoSeleccionado) {
                document.querySelector('#barco' + barco.name).disabled = true;
                this.barcoSeleccionado = null;
            }

            // Comprobamos si hemos colocados todos los barcos y si es así mostramos el botón para jugar
            if (this.barcos.length == this.barcosAnadidos.length) {
                this.mostrarJugar();

                //Activar detección pulsaciones en tablero
                this.addEventListenerClick();
            }

        } else {
            // Si no se puede insertar el barco, actualizamos el mensaje en el div#info
            const infoDiv = document.getElementById("info");
            infoDiv.innerHTML = `<p>Info: El barco ${barco.name} no se puede insertar. Pulsa R para rotar</p>`;
        }
    }
    pintarBarco(barco) {
        barco.posiciones.forEach(pos => {
            let celda = null;

            if (this.esJugador) {
                celda = document.querySelector(`#jugador [id='${pos.x}-${pos.y}']`);
            } else {
                celda = document.getElementById(`${pos.x}-${pos.y}`);
            }

            if (celda) {
                celda.style.backgroundColor = barco.color;
                celda.textContent = "🚢";
            }
        });
    }

    insertarBarco(barco) {
        this.barcoSeleccionado = barco;
    }

    rotarBarco() {
        this.orientacionBarcoSeleccionadoHorizontal = !this.orientacionBarcoSeleccionadoHorizontal;
    }

    addEventListenerClick() {
        document.querySelectorAll('#ia #tablero .celda').forEach((elemento) => {
            elemento.addEventListener('click', (event) => {
                if (window.turnoIA) return;

                let celdaId = event.target.id;
                const [x, y] = celdaId.split('-').map(Number);

                if (event.target.classList.contains('disparado')) return;
                event.target.classList.add('disparado');

                const resultado = window.tableroIA.recibirAtaque(x, y);

                if (resultado === 'agua') {
                    event.target.textContent = '💧';
                    window.turnoIA = true;
                    setTimeout(() => window.juego.turnoIAIA(), 1000); // Turno IA tras pequeño delay
                } else {
                    event.target.textContent = '💥';

                    // Verificamos si ha ganado el jugador
                    if (window.tableroIA.todosBarcosHundidos()) {
                        alert("¡Has ganado!");
                        this.deshabilitarClicks();
                    }
                }
            });
        });
    }

    recibirAtaque(x, y) {
        let resultado = 'agua';
        let i = 0;
        let encontrado = false;

        while (i < this.barcosAnadidos.length && !encontrado) {
            let barco = this.barcosAnadidos[i];
            let index = barco.posiciones.findIndex(pos => pos.x === x && pos.y === y);

            if (index !== -1) {
                barco.posiciones.splice(index, 1); // quitamos la posición impactada
                resultado = barco.posiciones.length === 0 ? 'hundido' : 'tocado';
                encontrado = true;
            }

            i++;
        }

        // Guardar el ataque
        this.ataquesRecibidos.push({ x, y, resultado });

        return resultado;
    }

    mostrarJugar() {
        if (this.juego) this.juego.mostrarJugar();
    }

    setGestorJuego(juego) {
        this.juego = juego;
    }

    todosBarcosHundidos() {
        return this.barcosAnadidos.every(barco => barco.posiciones.length === 0);
    }

    deshabilitarClicks() {
        document.querySelectorAll('.celda').forEach(celda => {
            celda.style.pointerEvents = 'none';
        });
    }

    actualizarInfo() {
        const infoDiv = document.getElementById("info");
        // Verificamos cuántos barcos han sido colocados
        const cantidadBarcosColocados = this.barcosAnadidos.length;

        if (cantidadBarcosColocados < 5) {
            // Mostrar mensaje de colocar los barcos
            infoDiv.innerHTML = `<p>Info: Coloca los barcos. (${cantidadBarcosColocados}/5)</p>`;
        } else {
            // Mostrar mensaje de "¡A jugar!"
            infoDiv.innerHTML = "<p>Info: ¡A jugar!</p>";
        }
    }

    toJSON() {
        return {
            dimensiones: this.dimensiones,
            esJugador: this.esJugador,
            barcos: this.barcos.map(barco => ({
                name: barco.name,
                size: barco.size,
                color: barco.color
            })),
            barcosAnadidos: this.barcosAnadidos.map(barco => ({
                name: barco.name,
                size: barco.size,
                color: barco.color,
                posiciones: barco.posiciones
            })),
            orientacionBarcoSeleccionadoHorizontal: this.orientacionBarcoSeleccionadoHorizontal,
            celdasOcupadas: Array.from(this.celdasOcupadas),
            ataquesRecibidos: this.ataquesRecibidos,
        };
    }

    cargarJuego() {
        // Repintar los ataques
        this.cargarExplosiones();

        if (this.barcos.length == this.barcosAnadidos.length) {
            this.mostrarJugar();

            //Activar detección pulsaciones en tablero
            this.addEventListenerClick();

            //Deshabilitamos todos los botones de seleccion de barcos
            let botones = document.querySelectorAll('.botonera button');

            if (botones.length > 0)
                botones.forEach(boton => boton.disabled = true);
        }
    }

    cargarExplosiones() {
        console.log( this.ataquesRecibidos);
         this.ataquesRecibidos.forEach(ataque => {
            const celda = this.esJugador
                ? document.querySelector(`#jugador [id='${ataque.x}-${ataque.y}']`)
                : document.querySelector(`#ia [id='${ataque.x}-${ataque.y}']`);

            if (!celda) return;

            celda.classList.add('disparado');
            if (ataque.resultado === 'agua') {
                celda.textContent = '💧';
            } else if (ataque.resultado === 'tocado' || ataque.resultado === 'hundido') {
                celda.textContent = '💥';
            }
        });
    }
}