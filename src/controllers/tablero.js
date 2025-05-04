import { Barco } from '../models/barco.model.js';

export class Tablero {
    dimensiones; // filas/columnas -> en nuestro caso 10
    celdasOcupadas;
    esJugador; // jugador o IA
    barcos = [];
    barcoSeleccionado = null;
    barcosAnadidos = [];
    orientacionBarcoSeleccionadoHorizontal = true;

    constructor(dimensiones, barcos = [], esJugador= false) {
        this.dimensiones = dimensiones;
        this.celdasOcupadas = new Set();
        this.esJugador= esJugador;
        this.barcos = barcos;
    }

    generarTablero() {
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
                    if(this.barcoSeleccionado) {                         
                        this.generarBarcoJugador(this.barcoSeleccionado, i, j);
                    }
                });

                tablero.appendChild(celda);
            }
        }
        if(this.esJugador) {
            this.generarBotonera();
            document.querySelector("#jugador #tablero-jugador").appendChild(tablero);
        } else {
            document.querySelector("#ia").appendChild(tablero);
        }
    }

    generarBotonera(){
        for(let barco of this.barcos) {
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

    generarBarcos(){
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
        this.pintarBarco(barco);
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
            this.pintarBarco(barco);
           
            // Comprobamos si hemos colocados todos los barcos y si es así mostramos el botón para jugar
            if(this.barcos.length == this.barcosAnadidos.length) {
                this.mostrarJugar();

                //Activar detección pulsaciones en tablero
                this.addEventListenerClick();
            }

        } else {
            console.log(`El barco ${barco.name} no se puede insertar en las coordenadas (${x}, ${y}).`);
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

                if (this.barcoSeleccionado) {
                    this.barcosAnadidos.push(barco);
                    document.querySelector('#barco' + barco.name).disabled = true;
                    this.barcoSeleccionado = null;
                }
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
                let celdaId = event.target.id;
                console.log(`Celda pulsada: ${celdaId} `);

                //Detectar si agua, tocado, hundido

            });
        })
    }
}