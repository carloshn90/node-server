import express from 'express';
import cors = require('cors');
import helmet = require('helmet');
import mongoose = require('mongoose');

import {Application} from 'express';
import {Connection} from 'mongoose';
import config from './config/config';
import {AppRoute} from './routes/app.route';

export class App {

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
        this.app.set('port', process.env.PORT || 3000);

        // Mongoose connection
        mongoose.connect(config.mongoDbConnection, {useNewUrlParser: true});
        const connection: Connection = mongoose.connection;
        connection.on('error', console.error.bind(console, 'connection error:'));
        connection.once('open', function () { console.log('The connection with the database is open'); });
    }

    /**
     * App routes
     */
    private setRoutes(): void {
        this.app.use('/', this.appRoute.getRouter());
    }
}

export default new App().getApp();
