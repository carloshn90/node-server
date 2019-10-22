
import { Response, Request} from 'express';
import {UserService} from '../services/user.service';
import {IUser} from '../models/user.model';

class HelloWorldController {

   userService: UserService;

   constructor() {
      this.userService = new UserService();
   }

   /**
    * GET /hello-world
    * Return hello word
    */
   getHelloWorld = async (req: Request, res: Response) => {

      const promiseUserArray: Promise<Array<IUser>> = this.userService.findAllUser();

      await promiseUserArray.then((userArray: Array<IUser>) => {
         res.send(userArray);
      });
   };

}

export default HelloWorldController;

