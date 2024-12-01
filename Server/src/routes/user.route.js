import { Router } from "express";
import { protectRoutes } from '../middlewares/auth.middleware.js';
import { updateProfile } from "../controllers/user.controller.js";

const router =  Router()

router.post("update-profile",protectRoutes,updateProfile)