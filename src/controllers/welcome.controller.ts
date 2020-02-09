
import { Response, Request } from 'express';

export class WelcomeController {

    /**
     * GET /
     * Return hello word
     */
    getWelcome = async (req: Request, res: Response) => {
        res.send('Welcome!');
    };
}
