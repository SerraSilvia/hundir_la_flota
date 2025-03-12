class Tablero {
    dimensiones; // filas/columnas
    celdas; //100
    dificultad;

    constructor(dimensiones, celdas) {
        this.dimensiones = dimensiones;
        this.celdas = celdas;
    }

    generarTablero() {
        const filasColumnas = 10;

        let tablero = document.createElement("div");
        tablero.id = "tablero";

        for (let i = 0; i < filasColumnas; i++) {
            for (let j = 0; j < filasColumnas; j++) {
                let celda = document.createElement("div");
                celda.classList.add("celda");
                celda.setAttribute("id", i + "-" + j);
                tablero.appendChild(celda);
                celda.style.backgroundColor = "blue";
            }
        }
        document.querySelector("#juego").appendChild(tablero);
    }
}

class Celda {
    x;
    y;
    barco; // T -F
    agua; // T-F

    constructor(x, y, barco, agua) {
        this.x = x;
        this.y = y;
        this.barco = barco;
        this.agua = agua;
    }

}

class Barco {
    nombreBarco; // tipos de barcos existentes
    posiciones;
    direccion;
    estado;  //tocado o hundido
    celdasTocadas; //numeros de cuantas celdas hay tocadas

    constructor(nombreBarco, posiciones, direccion, estado, celdasTocadas) {
        this.nombreBarco = nombreBarco;
        this.posiciones = posiciones;
        this.direccion = direccion;
        this.estado = estado;
        this.celdasTocadas = celdasTocadas;
    }

    colocarBarco() { }
    tieneEspacio() { }
    hundir() { }
    tocar() { }
}

const barcosJSON = [
    { "name": "Portaaviones", "size": 5 },
    { "name": "Acorazado", "size": 4 },
    { "name": "Crucero", "size": 3 },
    { "name": "Submarino", "size": 3 },
    { "name": "Destructor", "size": 2 }
];

const arraybarcos = JSON.parse(barcosJSON);