import express from 'express';
import {
  createPost,
  getAllPosts,
  getOnePost,
  editPost,
  removePost
} from '../controllers/postController.js';

const router = express.Router();

router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/:id', getOnePost);
router.put('/:id', editPost);
router.delete('/:id', removePost);

export default router;
