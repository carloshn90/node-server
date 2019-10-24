import app from './app';
import {LOGGER} from './config/logger.config';

const logger = LOGGER.child({ class: 'server' });

const server = app.listen(app.get('port'), () => {
    logger.debug('App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env'),
    );
    logger.debug('Press CTRL-C to stop\n');
}).on('error', LOGGER.error);

export default server;
