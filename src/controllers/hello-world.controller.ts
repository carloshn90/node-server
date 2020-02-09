
import { Response, Request} from 'express';
import {UserService} from '../services/user.service';
import {LOGGER} from '../config/logger.config';
import {IUser} from '../interfaces/user.interface';

export class HelloWorldController {
   logger = LOGGER.child({ class: 'server' });
   userService: UserService;

   constructor() {
      this.userService = new UserService();
   }

   /**
    * GET /hello-world
    * Return hello word
    */
   getHelloWorld = async (req: Request, res: Response) => {

      const promiseUserArray: Promise<Array<IUser>> = this.userService.findAll();

      await promiseUserArray.then((userArray: Array<IUser>) => {
         res.send(userArray);
      }).catch((error: Error) => {
         this.logger.error(error.message);
         res.status(404).send('Error trying to find the users: ' + error.message);
      });
   };

}

