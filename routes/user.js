import express from 'express';
import {
  createUser,
  fetchUsers,
  singleUser,
  getUserPosts
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', fetchUsers);
router.get('/:id', singleUser);
router.get('/:id/posts', getUserPosts); // user's posts

export default router;