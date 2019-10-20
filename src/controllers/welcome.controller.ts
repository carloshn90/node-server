
import { Response, Request} from 'express';

class WelcomeController {

    /**
     * GET /
     * Return hello word
     */
    static getWelcome = async (req: Request, res: Response) => {
        res.send('Welcome!');
    };
}

export default WelcomeController;
