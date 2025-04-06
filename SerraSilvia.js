class Tablero {
    dimensiones; // filas/columnas -> en nuestro caso 10
    celdasOcupadas;

    constructor(dimensiones) {
        this.dimensiones = dimensiones;
        this.celdasOcupadas = new Set();
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
                tablero.appendChild(celda);
            }
        }
        document.querySelector("#juego").appendChild(tablero);
    }

    generarBarco(barco) {
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
    pintarBarco(barco) {
        barco.posiciones.forEach(pos => {
            let celda = document.getElementById(`${pos.x}-${pos.y}`);
            if (celda) {
                celda.style.backgroundColor = barco.color;
                celda.textContent = "🚢";
            }
        });
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
    size; // size
    posiciones; //x - y
    color;

    constructor(nombreBarco, size, color) {
        this.nombreBarco = nombreBarco;
        this.size = size;
        this.posiciones = [];
        this.color = color;
    }
}

//instanciamos el tablero
let miTablero = new Tablero(10);
miTablero.generarTablero();

const barcosJSON = [
    { "name": "Portaaviones", "size": 5 },
    { "name": "Acorazado", "size": 4 },
    { "name": "Crucero", "size": 3 },
    { "name": "Submarino", "size": 3 },
    { "name": "Destructor", "size": 2 }
];

const coloresBarco = {
    "Portaaviones": "red",
    "Acorazado": "blue",
    "Crucero": "green",
    "Submarino": "orange",
    "Destructor": "purple"
};

barcosJSON.forEach(barco => {
    console.log(`Nombre: ${barco.name}, Tamaño: ${barco.size}`);
    // Asignamos color según el nombre
    const color = coloresBarco[barco.name] || "grey"; 
    const barcoInstancia = new Barco(barco.name, barco.size, color);
    miTablero.generarBarco(barcoInstancia);
});


