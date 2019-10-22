import { Router } from 'express';
import { WelcomeController } from '../controllers/welcome.controller';


export class WelcomeRoute {

    router: Router;
    welcomeController: WelcomeController;

    constructor() {
        this.router = Router();
        this.welcomeController = new WelcomeController();
        this.setRoutes();
    }

    public getRouter(): Router {
        return this.router;
    }

    private setRoutes(): void {
        // Say Welcome
        this.router.get('/', this.welcomeController.getWelcome);
    }
}
