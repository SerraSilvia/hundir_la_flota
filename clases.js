class Tablero {
    dimensiones; // 10x10
    celdas; //100

    generarTablero(){}
    mostrarTablero(){}
}

class Celda {
    x;
    y;
    nombreBarco;
    agua;

}

class Barco {
    tipo; // tipos de barcos existentes
    posiciones;
    direccion;
    estado;  //tocado o hundido
    celdasTocadas; //numeros de cuantas celdas hay tocadas

    colocarBarco(){}
    tieneEspacio(){}
    hundir(){}
    tocar(){}
}

const barcosJSON = [
    { "name": "Portaaviones", "size": 5 },
    { "name": "Acorazado", "size": 4 },
    { "name": "Crucero", "size": 3 },
    { "name": "Submarino", "size": 3 },
    { "name": "Destructor", "size": 2 }
];
 
const arraybarcos = JSON.parse(barcosJSON);