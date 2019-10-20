
import { Response, Request} from 'express';

class HelloWorldController {

   /**
    * GET /hello-world
    * Return hello word
    */
   static getHelloWorld = async (req: Request, res: Response) => {
      res.send('Hello world!');
   };

}

export default HelloWorldController;

