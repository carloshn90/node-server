import { Router } from 'express';
import {checkJwt} from '../middlewares/check-jwt.middleware';

import AuthController from '../controllers/auth.controller';
import {checkRole} from '../middlewares/check-role.middleware';

const router = Router();

// Login route
router.post('/login', AuthController.login);

// Change my password
router.post('/change-password', [checkJwt, checkRole(['ADMIN'])], AuthController.changePassword);

export default router;
