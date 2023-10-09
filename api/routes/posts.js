import express from 'express';
import { getPosts, addPost } from '../controllers/post.js';
const router = express.Router();

router.get('/posts', getPosts);
router.post('/posts', addPost);

export default router;