import { Router } from 'express';
import { HelloWorldController } from '../controllers/hello-world.controller';

export class HelloWorldRoute {

    router: Router;
    helloWorldController: HelloWorldController;

    constructor() {
        this.router = Router();
        this.helloWorldController = new HelloWorldController();
        this.setRoutes();
    }

    public getRouter(): Router {
        return this.router;
    }

    private setRoutes(): void {
        // Say Hello world
        this.router.get('/', this.helloWorldController.getHelloWorld);
    }
}
