import {Router} from 'express';

import helloWorldController from '../controllers/hello-world.controller';


const router = Router();

// Say Hello world
router.get('/', helloWorldController.getHelloWorld);

export default router;
