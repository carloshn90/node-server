import { Router } from 'express';
import { checkJwt } from '../middlewares/check-jwt.middleware';

import { checkRole } from '../middlewares/check-role.middleware';
import { AuthController } from '../controllers/auth.controller';

export class AuthRoute {

    router: Router;
    authController: AuthController;

    constructor() {
        this.router = Router();
        this.authController = new AuthController();
        this.setRoutes();
    }

    public getRouter(): Router {
        return this.router;
    }

    private setRoutes(): void {

        // Login route
        this.router.post('/login', this.authController.login);

        // Change my password
        this.router.post('/change-password', [checkJwt, checkRole(['ADMIN'])], this.authController.changePassword);
    }
}
