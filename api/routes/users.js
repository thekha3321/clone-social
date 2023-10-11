import express from 'express';
import { getUsers } from '../controllers/user.js';
const router = express.Router();

router.get('/find/:userId', getUsers);

export default router;