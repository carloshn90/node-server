import express from 'express';
import cors = require('cors');
import helmet = require('helmet');

import appRoutes from './routes/app.route';

// Create Express server
const app = express();

// Express configuration
app.use(cors());
app.use(helmet());
app.set('port', process.env.PORT || 3000);

/**
 * App routes
 */
app.use('/', appRoutes);

export default app;
