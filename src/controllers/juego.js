export class GestorJuego {
    turnoIA = false;
    barcosJugador = [];

    mostrarJugar() {
        let jugar = document.createElement('div');
        jugar.classList.add('animacion-jugar');

        let textoJugar = document.createElement('h2');
        textoJugar.classList.add('texto-animacion');
        textoJugar.textContent = '¡¡A Jugar!!';

        jugar.appendChild(textoJugar);

        document.querySelector('body').appendChild(jugar);
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