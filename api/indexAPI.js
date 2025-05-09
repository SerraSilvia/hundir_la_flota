/***
 * CONEXIÓN A API
 */

async function guardarPartida(nombreJugador, tableroJugador, tableroIA) {
    const partida = {
//DEBES DEFINIR AQUí LO QUE QUIERAS QUE TENGAS QUE GUARDAR
    };

    try {
        const response = await fetch("http://localhost:3000/partidas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(partida)
        });

        if (!response.ok) throw new Error("Error al guardar la partida");

        const data = await response.json();
        console.log("Partida guardada con éxito:", data);
        return data.id; // ID de la partida
    } catch (err) {
        console.error("Error:", err);
    }
}


async function cargarPartida(idPartida) {
    try {
        const response = await fetch(`http://localhost:3000/partidas/${idPartida}`);
        if (!response.ok) throw new Error("No se encontró la partida");

        const data = await response.json();
        console.log("Partida cargada:", data);
        return data;
    } catch (err) {
        console.error("Error:", err);
    }
}

document.getElementById("btnGuardar").addEventListener("click", () => {
    const nombreJugador = prompt("Introduce tu nombre:");
    //DEFINE AQUI LO QUE QUIERAS, PUEDES AÑADIR MAS PARAMETROS
    guardarPartida(nombreJugador, tableroJugador, tableroIA);
});

document.getElementById("btnCargar").addEventListener("click", async () => {
    const id = prompt("Introduce el ID de la partida:");
    const partida = await cargarPartida(id);
    // Llamamos a la función que recupera los tableros 
    
    // PROGRAMAR
    recuperaTablerosApi(partida);
});
