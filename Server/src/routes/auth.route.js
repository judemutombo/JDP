import express from 'express';
import {signup, signin, logout, checkAuth} from "../controllers/auth.controller.js";
import { protectRoutes } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup',signup);	


router.post('/signin', signin);

router.get('/logout', logout);

router.get('/check',protectRoutes, checkAuth);




export default router;