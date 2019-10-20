import {Router} from 'express';

import welcomeController from '../controllers/welcome.controller';

const router = Router();

// Say Welcome
router.get('/', welcomeController.getWelcome);

export default router;
