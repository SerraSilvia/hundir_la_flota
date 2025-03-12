class Tablero {
    dimensiones; // filas/columnas -> en nuestro caso 10
    celdas; // 100

    constructor(dimensiones) {
        this.dimensiones = dimensiones;
        this.celdas =  dimensiones * dimensiones;
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
                //estilos temporales
                //celda.style.width = "30px"; // Añadir tamaño a las celdas
               // celda.style.height = "30px";
               // celda.style.display = "inline-block";
               // celda.style.backgroundColor = "blue";
               // celda.style.border = "1px solid white"; // Bordes temporales
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

barcosJSON.forEach(barco => {
    console.log(`Nombre: ${barco.name}, Tamaño: ${barco.size}`);
 });

//instanciamos el tablero
let miTablero = new Tablero(10);
miTablero.generarTablero();