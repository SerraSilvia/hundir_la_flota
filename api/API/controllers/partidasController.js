import fs from 'fs';
import { generarId } from '../utils/idGenerator.js';

const rutaArchivo = './data/partidas.json';

export function getPartidas(req, res) {
    const data = JSON.parse(fs.readFileSync(rutaArchivo));
    res.json(data);
}

export function getPartidaById(req, res) {
    const data = JSON.parse(fs.readFileSync(rutaArchivo));
    const partida = data.find(p => p.id === req.params.id);
    if (partida) {
        res.json(partida);
    } else {
        res.status(404).json({ mensaje: 'Partida no encontrada' });
    }
}

export function crearPartida(req, res) {
    const data = JSON.parse(fs.readFileSync(rutaArchivo));
    const nuevaPartida = {
        id: generarId(),
        jugador: req.body.jugador,
        tableroJugador: req.body.tableroJugador,
        tableroIA: req.body.tableroIA
    };
    data.push(nuevaPartida);
    fs.writeFileSync(rutaArchivo, JSON.stringify(data, null, 2));
    res.status(201).json(nuevaPartida);
}