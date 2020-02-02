import express from 'express';
import cors = require('cors');
import helmet = require('helmet');
import mongoose = require('mongoose');
import bodyParser = require('body-parser');

import {Application} from 'express';
import config from './config/config';
import {AppRoute} from './routes/app.route';
import {LOGGER} from './config/logger.config';

export class App {
    logger = LOGGER.child({ class: 'App' });

    app: Application;
    appRoute: AppRoute;

    constructor() {
        this.app = express();
        this.appRoute = new AppRoute();
        this.setConfig();
        this.setRoutes();
    }

    getApp(): Application {
        return this.app;
    }

    /**
     * Configure application
     */
    private setConfig(): void {

        // Express configuration
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(bodyParser.json());
        this.app.set('port', process.env.PORT || 3000);

        // Mongoose connection
        mongoose.connect(config.mongoDbConnection, {useNewUrlParser: true})
            .catch((error: Error) => {
                this.logger.error(error.message);
            });
    }

    /**
     * App routes
     */
    private setRoutes(): void {
        this.app.use('/', this.appRoute.getRouter());
    }
}

export default new App().getApp();
