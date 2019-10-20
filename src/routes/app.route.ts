import {Router} from 'express';

import authRoute from './auth.route';
import welcomeRoute from './welcome.route';
import helloWorldRoute from './hello-world.route';

const routes = Router();

routes.use('/auth', authRoute);
routes.use('/', welcomeRoute);
routes.use('/hello-world', helloWorldRoute);

export default routes;
