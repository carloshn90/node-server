import { Router } from 'express';
import { AuthRoute } from './auth.route';
import { WelcomeRoute } from './welcome.route';
import { HelloWorldRoute } from './hello-world.route';

export class AppRoute {

    router: Router;
    welcomeRoute: WelcomeRoute;
    helloWorldRoute: HelloWorldRoute;
    authRoute: AuthRoute;

    constructor() {
        this.router = Router();
        this.welcomeRoute = new WelcomeRoute();
        this.helloWorldRoute = new HelloWorldRoute();
        this.authRoute = new AuthRoute();
        this.setRoutes();
    }

    public getRouter(): Router {
        return this.router;
    }

    private setRoutes(): void {
        this.router.use('/auth', this.authRoute.getRouter());
        this.router.use('/', this.welcomeRoute.getRouter());
        this.router.use('/hello-world', this.helloWorldRoute.getRouter());
    }
}
