const coloresBarco = {
    "Portaaviones": "red",
    "Acorazado": "blue",
    "Crucero": "green",
    "Submarino": "orange",
    "Destructor": "purple"
};

export class Barco {
    nombreBarco; // tipos de barcos existentes
    size; // size
    posiciones; //x - y
    color;

    constructor(nombreBarco, size) {
        this.nombreBarco = nombreBarco;
        this.size = size;
        this.posiciones = [];
        this.color = coloresBarco[nombreBarco] || "grey";
    }
}