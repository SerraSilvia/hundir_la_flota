import express from 'express';
import { getPartidas, getPartidaById, crearPartida } from '../controllers/partidasController.js';

const router = express.Router();

router.get('/', getPartidas);
router.get('/:id', getPartidaById);
router.post('/', crearPartida);

export default router;